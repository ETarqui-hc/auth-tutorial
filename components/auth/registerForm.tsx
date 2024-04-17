"use client";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "./CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schemas";
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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values).then(
                (data) => {
                    setError(data.error);
                    setSuccess(data.success);
                }
            )
        })

    }
    return (
        <CardWrapper headerLabel="Create an account"
            backButtonLabel="Already have an account?" backButtonRef="/auth/login" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                        <FormControl>
                                            <Input {...field}
                                                placeholder="John Doe"
                                                type="text"
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
                        Create an account
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}
export default RegisterForm;