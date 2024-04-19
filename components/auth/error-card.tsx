import { Header } from "./header";
import { BackButton } from "./BackButton";
import { Card,CardFooter,CardHeader } from "../ui/card";
import { CardWrapper } from "./CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () =>{
    return (
      <CardWrapper
        headerLabel="Oops! Something went wrong!"
        backButtonRef="/auth/login"
        backButtonLabel="Back to login"
      >
        <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="text-destructive"/>
        </div>

      </CardWrapper>
    )
}
