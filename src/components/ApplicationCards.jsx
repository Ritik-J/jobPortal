import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import UseFetch from "@/hooks/UseFetch";
import { updateApplicationStatus } from "@/api/apiApplication";
import { Skeleton } from "./ui/skeleton";
const ApplicationCards = ({ application, isCandidate = false }) => {
  const handelDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiriedStatus, fn: fnHiredStatus } = UseFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiredStatus(status).then(() => fnHiredStatus());
  };

  return (
    <div>
      <Card>
        {loadingHiriedStatus && <Skeleton className="w-[100%] h-5" />}
        <CardHeader>
          <CardTitle className="flex justify-between font-bold">
            {isCandidate ? (
              `${application?.job?.title} at ${application?.job?.company?.name}`
            ) : (
              <h2>Name: {application?.name}</h2>
            )}
            <Download
              size={18}
              className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
              onClick={handelDownload}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex gap-2 items-center">
              <BriefcaseBusiness size={15} /> {application?.experience} years of
              experience
            </div>
            <div className="flex gap-2 items-center">
              <School size={15} /> {application?.education} Degree
            </div>
            <div className="flex gap-2 items-center">
              <Boxes size={15} /> Skills: {application?.skills}
            </div>
            <hr />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="capitalize font-bold">
            Submitted at:{" "}
            {new Date(application?.created_at).toLocaleDateString()}
          </span>
          {isCandidate ? (
            <span className="capitalize font-bold">
              Status: {application.status}
            </span>
          ) : (
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application.status}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplicationCards;
