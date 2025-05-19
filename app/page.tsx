import Link from "next/link";

export default function Home() {
  return (

    <div>
      <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the App</h1>

     
    </main>

<div className="">
   <Link href="/login">
    
     <button>Giriş yap</button>
     
     </Link>

     <Link href="/register">
        <button>Kayıt ol</button>   
       </Link>
</div>
   

   
    </div>
    

    
  );
}
