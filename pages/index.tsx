import AppHead from '@/components/atoms/AppHead';
import AppLogo from '@/components/atoms/AppLogo';

export default function Home() {
  return (
    <div className="p-3 text-center">
      <AppHead
        title="Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences"
        description="Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb."
      />
      <AppLogo className="text-primary mx-auto" />
      <h1 className="text-xl my-2">
        <a
          href="https://www.airbnb.com/"
          target="__blank"
          className="text-primary font-bold hover:underline"
        >
          Airbnb
        </a>{' '}
        Clone
      </h1>
    </div>
  );
}
