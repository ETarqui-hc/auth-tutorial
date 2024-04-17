"use client";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "./CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrors } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values).then(
                (data) => {
                    setError(data?.error);
                }
            )
        })

    }
    return (
        <CardWrapper headerLabel="Welcome back"
            backButtonLabel="Don't have an account?" backButtonRef="/auth/register" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                        <FormControl>
                                            <Input {...field}
                                                placeholder="john.doe@example.com"
                                                type="email"
                                                disabled={isPending}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                        <FormControl>
                                            <Input {...field}
                                                type="password"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormErrors message={error} />
                    <FormSuccess message={success} />

                    <Button type="submit" className="w-full"
                        disabled={isPending}
                    >
                        Login
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}
export default LoginForm;