import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const LoginForm = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const queryClient = useQueryClient();

    const { mutate: LoginMutation, isLoading } = useMutation({
        mutationFn: (data) => {
            axiosInstance.post("/auth/login", data)
        },
        onSuccess: () => {
            toast.success('Logged in successfully');
            queryClient.invalidateQueries({ queryKey: ['authUser']});
        },
        onError: (error) => {
            toast.error('Error logging in');
            console.error('Error logging in:', error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        LoginMutation({ username, password });
    }


  return (
    <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-md'>
		<input
			type='text'
			placeholder='Username'
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			className='input input-bordered w-full'
			required
		/>
		<input
			type='password'
			placeholder='Password'
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			className='input input-bordered w-full'
			required
		/>

		<button type='submit' className='btn btn-primary w-full'>
			{isLoading ? <Loader className='size-5 animate-spin' /> : "Login"}
		</button>
	</form>
  )
}

export default LoginForm