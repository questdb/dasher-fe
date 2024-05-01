import Auditer from '../components/Auditer';

async function fetchAuditLogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audit`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return { items: [] }; // Return a default response to handle the error
  }
}

export default async function AuditPage() {
  const { items: data } = await fetchAuditLogs();

  console.log("Fetched audit logs:", data);

  return (
    <div className="bg-gray-900 text-white h-screen">
      <Auditer />
    </div>
  );
}
