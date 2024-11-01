import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-jobs" : "/jobs-listing");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <Skeleton className="mb-4 w-[100%] h-5" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a....
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 md:px-40">
        <Button
          variant="capeOne"
          onClick={() => handleRoleSelection("candidate")}
          className="text-2xl h-30"
        >
          Candidate
        </Button>
        <Button
          variant="capeTwo"
          onClick={() => handleRoleSelection("recruiter")}
          className="text-2xl h-30"
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
