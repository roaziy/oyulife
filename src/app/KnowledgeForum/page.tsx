export default function KnowledgeForum() {
  const events = [
    {
      id: 1,
      name: "Science Workshop",
      date: "April 15, 2025",
      description: "A workshop to explore the latest advancements in science and technology.",
    },
    {
      id: 2,
      name: "Art Exhibition",
      date: "April 20, 2025",
      description: "An exhibition showcasing artwork created by students and teachers.",
    },
    {
      id: 3,
      name: "Math Olympiad",
      date: "April 25, 2025",
      description: "A competitive event to challenge and enhance mathematical skills.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Knowledge Forum</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-700 mt-2">{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}