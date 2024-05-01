import { faker } from '@faker-js/faker';

export async function GET(request) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit')) || 10;
  const page = parseInt(url.searchParams.get('page')) || 1;

  const items = Array.from({ length: limit }, (_, index) => {
    const offset = (page - 1) * limit;
    return {
      user: {
        name: faker.name.fullName(),
        imageUrl: faker.image.avatar(),
      },
      commit: faker.git.commitSha().slice(0, 8),
      branch: faker.git.branch(),
      status: faker.helpers.arrayElement(['Completed', 'Error']),
      duration: faker.number.int({ min: 10, max: 60 }) + 's',
      date: faker.date.recent().toISOString(),
      offsetIndex: offset + index,
    };
  });

  return new Response(JSON.stringify({ items }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
