export default function ScreenSize() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div
          className="w-full h-full text-center
        bg-blue-200 sm:bg-green-200 md:bg-yellow-200 lg:bg-red-200 xl:bg-purple-200 2xl:bg-pink-200"
        >
          <p className="text-xl font-bold">
            Resize your browser window and watch the background color change!
          </p>
          <p>Different colors represent different screen sizes:</p>
          <ul className="mt-4 text-lg">
            <li>
              <strong>Blue:</strong> Default (mobile)
            </li>
            <li>
              <strong>Green:</strong> `sm:` (≥640px)
            </li>
            <li>
              <strong>Yellow:</strong> `md:` (≥768px)
            </li>
            <li>
              <strong>Red:</strong> `lg:` (≥1024px)
            </li>
            <li>
              <strong>Purple:</strong> `xl:` (≥1280px)
            </li>
            <li>
              <strong>Pink:</strong> `2xl:` (≥1536px)
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
