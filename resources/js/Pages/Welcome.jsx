import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Label } from '@/Components/ui/label';
import { Link, Head, useForm } from '@inertiajs/react';
import { ArrowRight, KeyIcon, Lock, User2 } from 'lucide-react';
import { useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
  });
  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };
  return (
    <>
      <Head title="Login Aplikasi" />

      <section className="flex justify-center items-center fixed inset-0 shadow-sm">
        <div className="flex items-center">
          <div className="min-w-96 h-[500px] bg-clr-secondary rounded-l-lg shadow-inner hidden lg:block ">
            <div className="flex flex-col justify-center items-center mt-36">
              <img src="/img/Logo.png" className="w-32 h-32" />

              <h2 className="text-3xl font-poppins font-semibold bg-clip-text text-transparent bg-gradient-to-r from-clr-orange to-clr-yellow">
                Miftah Machine
              </h2>
              <p className="text-base text-clr-orange font-semibold">
                Kreativitas Anda, Mesin Jahit Kami.
              </p>
            </div>
          </div>
          <div class="min-w-96 h-[500px] bg-clr-primary-50 rounded-r-lg shadow-inner">
            <div class="flex flex-col space-y-5 p-9">
              <div>
                <h2 className="text-4xl text-clr-orange font-semibold">
                  Masuk Akun
                </h2>
              </div>
              <div>
                <h3 className="text-sm text-clr-primary-900 font-semibold mb-3">
                  Selamat datang di Miftah Machine
                </h3>
                <p className="text-xs text-clr-primary-900">
                  Silahkan login terlebih dahulu belum punya akun? <br />
                  <Link href={route('register')} className="underline">
                    daftar
                  </Link>
                </p>
              </div>
              <div>
                <form onSubmit={submit} className="flex flex-col space-y-5">
                  <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="email" className='text-xs' value={'Email :'}  />
                    <div className="flex items-center border-2 bg-clr-primary-100 px-2 rounded-md">
                      <User2 className="w-4 h-4" />
                      <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="bg-transparent focus:outline-none w-full px-4 h-10"
                        placeholder="Masukan email anda?"
                      />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>

                    </div>
                    <Label htmlFor="password" className="text-xs">
                      Password :
                    </Label>
                    <div className="flex items-center bg-clr-primary-100 px-2 border-2 rounded-md">
                      <Lock className="w-4 h-4" />
                      <input
                        type="password"
                        value={data.password}
                        id="password"
                        className="bg-transparent focus:outline-none w-full px-4 h-10"
                        placeholder="Masukan password"
                        onChange={(e) => setData('password', e.target.value)}
                      />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                  </div>
                  <div className="bg-orange-950/70 w-full rounded-md">
                    <button
                      type="submit"
                      className="flex items-center gap-3 justify-center text-white h-11 font-semibold w-full"
                    >
                      <span>Masuk</span>
                      <span>
                        <ArrowRight className="w-4 h-4" />
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
