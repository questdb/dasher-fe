// QuestDB demo instance API endpoint
export const revalidate = 0;
export const dynamic = "force-dynamic";

const QUESTDB_URL = 'https://demo.questdb.io';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const size = searchParams.get('size') || 'sample';

    if (size !== 'sample') {
      try {
        let limit;
        switch (size) {
          case '1k':
            limit = 1000;
            break;
          case '100k':
            limit = 100000;
            break;
          case 'full':
            limit = 1500000000;
            break;
          default:
            limit = 1000;
        }

        const query = encodeURIComponent(`SELECT * FROM trades LIMIT ${limit};`);
        console.log(`Attempting QuestDB query with limit: ${limit}`);
        const response = await fetch(`${QUESTDB_URL}/exec?query=${query}`);

        if (response.ok) {
          console.log('QuestDB query successful');
          const data = await response.json();
          const items = data.dataset.map((row: any[]) => ({
            symbol: row[0],
            side: row[1].toUpperCase(),
            price: parseFloat(row[2]),
            amount: parseFloat(row[3]),
            timestamp: row[4],
          }));

          return new Response(JSON.stringify({
            items,
            totalRows: data.count || items.length,
            message: `Showing ${items.length} trades from QuestDB`,
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          });
        } else {
          console.log('QuestDB query failed, falling back to generated data');
        }
      } catch (error) {
        // Fall through to generateDataset
      }
    }

    // Handle sample data or fallback cases
    const items = generateDataset(size === 'sample' ? '1k' : size);
    return new Response(JSON.stringify({
      items,
      totalRows: items.length,
      message: `Generated ${items.length} sample records`,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      items: [],
      error: 'Failed to fetch data',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function generateDataset(size: string) {
  let length;
  switch (size) {
    case '1k':
      length = 1000;
      break;
    case '100k':
      length = 100000;
      break;
    case 'full':
      length = 1500000000;
      break;
    default:
      length = 1000;
  }

  return Array.from({ length }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 1000).toISOString(),
    symbol: ['BTC-USD', 'ETH-USD', 'SOL-USD'][Math.floor(Math.random() * 3)],
    price: Math.random() * 50000,
    amount: Math.random() * 10,
    side: Math.random() > 0.5 ? 'BUY' : 'SELL',
  }));
}
