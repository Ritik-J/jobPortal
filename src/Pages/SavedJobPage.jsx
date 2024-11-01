import { getSavedJob } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const SavedJobPage = () => {
  const { isLoaded } = useUser();
  const {
    loading: savedLoading,
    data: savedJobs,
    fn: fnSavedJobs,
  } = UseFetch(getSavedJob);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || savedLoading) {
    return <Skeleton className="w-[100%] h-5" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {savedLoading === false && (
        <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 gap-4 mx-[5%]">
          {savedJobs?.length ? (
            savedJobs.map((save) => {
              return (
                <JobCard
                  key={save.id}
                  job={save?.job}
                  savedJob={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>You haven't saved any jobs yet 👀</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobPage;
