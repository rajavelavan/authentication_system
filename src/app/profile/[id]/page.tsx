export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col text-2xl items-center justify-center min-h-screen m-4">
      <h1>Profile</h1>
      <hr />
      <p className="flex flex-col items-center justify-between">
        Section
        <hr />
        <span className="p-1 mt-2 ml-5 rounded bg-blue-500 text-white">
          {params.id}
        </span>
      </p>
    </div>
  );
}
