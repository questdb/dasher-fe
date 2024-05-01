import Auditer from '../components/Auditer';


// @TODO! Tailor our API call to match our component.
async function fetchAuditLogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audit`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return { items: [] }; // What to do on error?
  }
}

export default async function AuditPage() {
  // @TODO! You have data, pass it to the component.
  //... However you have assembled it.
  const { items: data } = await fetchAuditLogs();

  console.log("Fetched audit logs:", data);

  return (
    <div className="bg-gray-900 text-white h-screen">
      <Auditer />
    </div>
  );
}
