import { getMyJobs } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import JobCard from "./JobCard";
import UseFetch from "@/hooks/UseFetch";

const ShowJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = UseFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
  }, []);

  return (
    <div>
      {loadingCreatedJobs ? (
        <Skeleton className="mt-4 w-[100%] h-5" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-[5%]">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobAction={fnCreatedJobs}
                  isMyJob
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowJobs;
