import ShowApplications from "@/components/ShowApplications";
import ShowJobs from "@/components/ShowJobs";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";

const MyJobsPage = () => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <Skeleton className="w-[100%] h-5" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <ShowApplications />
      ) : (
        <ShowJobs />
      )}
    </div>
  );
};

export default MyJobsPage;
