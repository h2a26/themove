export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-beige text-deep-black">
      <h1 className="text-2xl font-bold mb-4">You are offline</h1>
      <p className="text-md">Sorry, this page isn’t available while offline. Please check your connection.</p>
    </div>
  );
}
