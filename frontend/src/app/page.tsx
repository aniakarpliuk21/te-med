import HomeComponent from "@/components/home.component";

export default function Home() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 border border-gray-300">
          <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
            Welcome to Messenger
          </h1>
          <HomeComponent />
        </div>
      </div>
  );
}

