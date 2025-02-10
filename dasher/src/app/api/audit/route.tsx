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
        let message;

        switch (size) {
          case '1k':
            limit = 1000;
            message = 'Showing 1,000 trades from QuestDB';
            break;
          case '100k':
            limit = 100000;
            message = 'Showing 100,000 trades from QuestDB';
            break;
          case 'full':
            limit = 1500000000;
            message = '@TODO: Implement a solution that can handle 1.5B rows efficiently';
            break;
          default:
            limit = 1000;
            message = 'Showing 1,000 trades from QuestDB';
        }

        const query = encodeURIComponent(`SELECT * FROM trades LIMIT ${limit};`);
        const response = await fetch(`${QUESTDB_URL}/exec?query=${query}`);

        if (!response.ok) {
          console.error('QuestDB Error:', await response.text());
          return generateLargeDatasetResponse();
        }

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
          message,
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
      } catch (error) {
        console.error('QuestDB fetch error:', error);
        return generateLargeDatasetResponse();
      }
    }

    // Initial sample data with multiple records
    return new Response(JSON.stringify({
      items: [
        {
          timestamp: '2024-01-23T11:00:00.000Z',
          symbol: 'BTC-USD',
          price: 42000.50,
          amount: 1.23456,
          side: 'BUY',
        },
        {
          timestamp: '2024-01-23T11:00:01.000Z',
          symbol: 'ETH-USD',
          price: 2500.75,
          amount: 10.5,
          side: 'SELL',
        },
        {
          timestamp: '2024-01-23T11:00:02.000Z',
          symbol: 'SOL-USD',
          price: 95.25,
          amount: 100.0,
          side: 'BUY',
        },
        {
          timestamp: '2024-01-23T11:00:03.000Z',
          symbol: 'BTC-USD',
          price: 41998.75,
          amount: 0.5,
          side: 'SELL',
        }
      ],
      totalRows: 4,
      message: 'Sample data - use ?size=1k, ?size=100k, or ?size=full to load different datasets',
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

// Helper function to generate large dataset response
function generateLargeDatasetResponse() {
  const sampleLargeDataset = Array.from({ length: 100000 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 1000).toISOString(),
    symbol: ['BTC-USD', 'ETH-USD', 'SOL-USD'][Math.floor(Math.random() * 3)],
    price: Math.random() * 50000,
    amount: Math.random() * 10,
    side: Math.random() > 0.5 ? 'BUY' : 'SELL',
  }));

  return new Response(JSON.stringify({
    items: sampleLargeDataset,
    totalRows: 1500000000,
    message: '@TODO: Implement a solution that can handle 1.5B rows efficiently',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
