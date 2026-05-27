export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-deep-black px-6 text-center">
      <div className="shinkai-panel rounded-2xl px-8 py-10 shadow-sm max-w-lg">
        <h1 className="text-2xl font-bold mb-4">You are offline</h1>
        <p className="text-md">
          Sorry, this page isn’t available while offline. Please check your connection.
        </p>
      </div>
    </div>
  );
}
