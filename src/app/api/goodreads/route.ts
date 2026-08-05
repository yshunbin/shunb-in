import { NextResponse } from "next/server";

const GOODREADS_USER_ID = "201501144";

type Book = {
  title: string;
  author: string;
  image: string;
  link: string;
  bookId: string;
  monthYear?: string;
};

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getTag(block: string, tag: string) {
  const cdata = block.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"),
  );
  if (cdata?.[1]) return decodeXml(cdata[1].trim());

  const plain = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return plain?.[1] ? decodeXml(plain[1].trim()) : "";
}

function formatMonthYear(raw: string) {
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function parseBooks(xml: string, limit = 5, sortByReadAt = false): Book[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  const books = items.map((match) => {
    const block = match[1];
    const bookId = getTag(block, "book_id");
    const readAtRaw = getTag(block, "user_read_at") || getTag(block, "pubDate");
    return {
      title: getTag(block, "title"),
      author: getTag(block, "author_name"),
      image:
        getTag(block, "book_medium_image_url") ||
        getTag(block, "book_large_image_url") ||
        getTag(block, "book_image_url"),
      link: bookId
        ? `https://www.goodreads.com/book/show/${bookId}`
        : getTag(block, "link"),
      bookId,
      monthYear: formatMonthYear(readAtRaw),
      _sortDate: new Date(readAtRaw).getTime() || 0,
    };
  });

  const ordered = sortByReadAt
    ? [...books].sort((a, b) => b._sortDate - a._sortDate)
    : books;

  return ordered.slice(0, limit).map(({ _sortDate, ...book }) => book);
}

async function fetchShelf(shelf: string, perPage = 5, sortByReadAt = false) {
  const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${shelf}&per_page=${perPage}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; shunb-in-portfolio/1.0; +https://github.com/yshunbin/shunb-in)",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Goodreads RSS failed (${response.status}) for shelf "${shelf}"`);
  }

  return parseBooks(await response.text(), perPage, sortByReadAt);
}

export async function GET() {
  try {
    const [currentlyReading, recentlyRead] = await Promise.all([
      fetchShelf("currently-reading", 5),
      fetchShelf("read", 20, true).then((books) => books.slice(0, 3)),
    ]);

    return NextResponse.json({
      profileUrl: `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}-shun-bin`,
      currentlyReading,
      recentlyRead,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load Goodreads data.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
