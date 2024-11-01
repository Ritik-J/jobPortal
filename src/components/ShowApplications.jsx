import { getApplications } from "@/api/apiApplication";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import ApplicationCards from "./ApplicationCards";

const ShowApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = UseFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

  if (loadingApplications) {
    return <Skeleton className="mb-4 w-[100%] h-5" />;
  }

  return (
    <div className="flex flex-col gap-2 mx-[5%]">
      {applications?.map((application) => {
        return (
          <ApplicationCards
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default ShowApplications;
