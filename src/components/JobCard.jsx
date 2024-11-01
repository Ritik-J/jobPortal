import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { BookmarkIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { deleteJob, savedJobs } from "@/api/apiJobs";
import UseFetch from "@/hooks/UseFetch";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  savedJob = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedJob);

  const {
    fn: fnSavedJobs,
    data: savedJobsData,
    loading: loadingSavedJobs,
  } = UseFetch(savedJobs, {
    alreadySaved: saved,
  });

  const { user } = useUser();

  const handelSavedjobs = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  const { loading: loadingDeleteJobs, fn: fnDeleteJobs } = UseFetch(deleteJob, {
    job_id: job.id,
  });

  const handelDeleteJob = async () => {
    await fnDeleteJobs();
    onJobSaved();
  };

  useEffect(() => {
    if (savedJobsData !== undefined) {
      setSaved(savedJobsData?.length > 0);
    }
  }, [savedJobsData]);

  return (
    <>
      <Card className="mb-4 flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between font-bold">
            {job.title}

            {isMyJob && (
              <Trash2Icon
                fill="red"
                size={18}
                className="text-red-300 cursor-pointer"
                onClick={handelDeleteJob}
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <div className="flex justify-between">
            {job.company && <img src={job.company.logo_url} className="h-6" />}
            <div className="flex gap-2 items-center">
              <MapPinIcon size={15} /> {job.location}
            </div>
          </div>
          <hr />
          {job.description.substring(0, 96)}...
        </CardContent>
        <CardFooter className="flex gap-2">
          <Link to={`/job/${job.id}`} className="flex-1">
            <Button variant="capeTwo">More Details</Button>
          </Link>

          {!isMyJob && (
            <Button
              variant="capeOne"
              className="w-15"
              onClick={handelSavedjobs}
              disabled={loadingSavedJobs}
            >
              {saved ? (
                <BookmarkIcon size={20} fill="blue" />
              ) : (
                <BookmarkIcon size={20} />
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default JobCard;
