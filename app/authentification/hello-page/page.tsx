"use client";
export default function HelloPage() {
  return (
    <div className="w-full flex items-center min-h-screen p-4 lg:justify-center">
      <div className="w-full max-w-md border-2 rounded-lg shadow-lg p-6">
        <h1 className="text-lime-200 text-lg">
          Hello, welcome to the protected page!
        </h1>
      </div>
    </div>
  );
}
