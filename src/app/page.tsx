import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import AIConcierge from "@/components/AIConcierge";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Destinations />
      <AIConcierge />
      <InquiryForm />
      <Footer />
    </main>
  );
}
