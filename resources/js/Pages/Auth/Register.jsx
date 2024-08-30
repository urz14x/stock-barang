import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <>
      <Head title="Register" />
      <section className="flex justify-center items-center fixed inset-0 text-xs">
        <div className="flex items-center">
          <div className="min-w-96 h-[530px] bg-clr-secondary rounded-l-lg shadow hidden lg:block ">
            <div className="flex  flex-col justify-center items-center mt-36">
              <img
                src="img/Logo.png"
                className="w-32 h-32"
                alt="Logo miftah machine"
              />
              <h2 className="text-3xl font-poppins font-semibold bg-clip-text text-transparent bg-gradient-to-r from-clr-orange to-clr-yellow">
                Miftah Machine
              </h2>
              <p className="text-base text-clr-orange font-semibold">
                Kreativitas Anda, Mesin Jahit Kami.
              </p>
            </div>
          </div>
          <div className="min-w-96 h-auto bg-clr-primary-50 rounded-r-lg shadow-inner">
            <div className="flex flex-col space-y-5 p-9">
              <div>
                <h2 className="text-4xl text-clr-orange font-semibold">
                  Daftar Akun
                </h2>
              </div>
              <div>
                <h3 className=" text-clr-primary-900 font-semibold">
                  Selamat datang di Miftah Machine
                </h3>
                <p className=" text-clr-primary-900">
                  Mempunyai akun?
                  <Link href="/" className="underline">
                    Masuk
                  </Link>
                </p>
              </div>
              <div>
                <form onSubmit={submit} className="flex flex-col space-y-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-xs">Nama :</Label>
                    <div className="flex border-2 items-center bg-clr-primary-100 px-2 rounded-md">
                      <svg
                        className="w-5 h-5 text-clr-primary-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <input
                        type="text"
                        className="bg-transparent  focus:outline-none w-full px-4 h-10"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="eg. Tasya Fitri Sawaliyah"
                      />

                    </div>
                    {errors.name && <InputError message={errors.name} className="mt-2" /> }
                    <Label htmlFor="email" className="text-xs">Email :</Label>
                    <div className="flex items-center bg-clr-primary-100 px-2 border-2 rounded-md">
                      <svg
                        className="w-5 h-5 text-clr-primary-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <input
                        type="email"
                        className="bg-transparent focus:outline-none w-full px-4 h-10"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="tasyafs@gmail.com"
                      />

                    </div>
                    {errors.email && <InputError message={errors.email} className="mt-2" /> }
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-xs">Password :</label>
                    <div className="flex items-center bg-clr-primary-100 px-2 border-2 rounded-md">
                      <svg
                        className="w-5 h-5 text-clr-primary-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                        />
                      </svg>
                      <input
                        type="password"
                        className="bg-transparent focus:outline-none w-full px-4 h-10"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="********"
                      />

                    </div>
                    {errors.password && <InputError message={errors.name} className="mt-2" /> }
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirm_password">
                      Konfirmasi Password :
                    </label>
                    <div className="flex items-center bg-clr-primary-100 px-2  border-2 rounded-md">
                      <svg
                        className="w-5 h-5 text-clr-primary-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                        />
                      </svg>
                      <input
                        type="password"
                        className="bg-transparent focus:outline-none w-full px-4 h-10"
                        id="confirm_password"
                        name="confirm_password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                          setData('password_confirmation', e.target.value)
                        }
                        placeholder="********"
                      />
                    </div>
                  </div>
                  <div className="bg-orange-950/70 w-full rounded-md">
                    <button
                      type="submit"
                      className="flex items-center gap-3 justify-center text-white h-11 font-semibold w-full">
                      <span>Daftar</span>
                      <span>
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
