import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import { Skeleton } from "@/components/ui/skeleton";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Briefcase,
  DoorClosedIcon,
  DoorOpenIcon,
  MapPinIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ApplyJobs from "@/components/ApplyJobs";
import ApplicationCards from "@/components/ApplicationCards";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingSingleJob,
    data: singleJobData,
    fn: fnSingleJob,
  } = UseFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = UseFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handelHiringStatus = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnSingleJob());
  };

  useEffect(() => {
    if (isLoaded) {
      fnSingleJob();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSingleJob) {
    return <Skeleton className="w-[100%] h-[20px] rounded-full" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5 ml-[5%]">
      <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-3xl">
          {singleJobData?.title}
        </h1>
        <img
          src={singleJobData?.company?.logo_url}
          alt={singleJobData?.title}
          className="h-12"
        />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {singleJobData?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {singleJobData?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {singleJobData?.isOpen ? (
            <>
              <DoorOpenIcon /> Open
            </>
          ) : (
            <>
              <DoorClosedIcon /> Closed
            </>
          )}
        </div>
      </div>

      {singleJobData?.recruiter_id === user?.id && (
        <Select onValueChange={handelHiringStatus}>
          <SelectTrigger
            className={`w-full ${
              singleJobData?.isOpen ? "bg-cape-cod-600" : "bg-red-950"
            }`}
          >
            <SelectValue
              placeholder={
                "Hiring staus " +
                (singleJobData?.isOpen ? "(open)" : "(closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p className="sm:text-lg">{singleJobData?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What We Are Looking For
      </h2>
      <MDEditor.Markdown
        source={singleJobData?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {singleJobData?.recruiter_id !== user?.id && (
        <ApplyJobs
          job={singleJobData}
          user={user}
          fetchJob={fnSingleJob}
          applied={singleJobData?.applications.find(
            (ap) => ap.candidate_id === user.id
          )}
        />
      )}
      {loadingHiringStatus && <Skeleton className="w-[100%] h-5" />}

      {singleJobData?.applications?.length > 0 &&
        singleJobData?.recruiter_id === user?.id && (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Job Applications</h2>
            {singleJobData?.applications.map((application) => {
              return (
                <ApplicationCards
                  key={application.id}
                  application={application}
                />
              );
            })}
          </div>
        )}
    </div>
  );
};

export default JobPage;
