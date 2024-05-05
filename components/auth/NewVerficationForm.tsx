"use client"
import { CardWrapper } from "./CardWrapper"
import { ClimbingBoxLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "../form-success"
import { FormErrors } from "../form-error"
export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");


    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing Token")
            return;
        }

        newVerification(token).then((data) => {
            setSuccess(data.success);
            setError(data.error)
        })
            .catch(() => {
                setError("Something went wrong")
            })
    }, [token,error,success])
    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (<CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to Login"
        backButtonRef="/auth/login"
    >
        <div className="flex items-center w-full justify-center">
            {!success && !error && (
                <ClimbingBoxLoader  />
            )}
            <FormSuccess message={success} />
            <FormErrors message={error} />
        </div>
    </CardWrapper>
    )
}