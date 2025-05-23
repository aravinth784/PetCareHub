export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow text-center px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to PetCareHub</h1>
        <p className="text-lg max-w-3xl mx-auto mb-4">
          Your trusted companion for all things pet care. Track your pet’s health, find adoption opportunities, and locate nearby veterinarians easily.
        </p>
        <p className="text-md max-w-2xl mx-auto ">
          Whether you’re a new pet parent or an experienced caregiver, PetCareHub helps you stay organized and connected with a community of pet lovers.
        </p>
      </main>

      <footer className="bg-base-100 border-t border-gray-300 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center ">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>Email: support@petcarehub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Pet Lane, Animal City, PA 12345</p>
          <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} PetCareHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

