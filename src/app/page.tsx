"use client";

import LoadingAnimation from "@/components/loadingAnimation";
import MainContainer from "@/components/mainContainer";
import MainWrapper from "@/components/mainWrapper";
import NewsPopUp from "@/components/NewsPopUp";
import PaginationController from "@/components/paginationController";
import DeckBox from "@/features/decks/deckBox";
import { getAllDecks } from "@/features/decks/useDecks";
import { Deck } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AtemBackground from '../../public/images/atem_background.png'

export default function App() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 768
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsPopUpVisible, setNewsPopUpVisible] = useState(false);

  const ITEMS_PER_PAGE = useMemo(() => {
    if (windowWidth >= 768) return 15;
    if (windowWidth >= 640) return 8;
    return 4;
  }, [windowWidth]);
  const router = useRouter();

  const goToPage = (id: number) => {
    router.push(`/deck/${id}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(decks.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [decks, ITEMS_PER_PAGE]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecksInfo = await getAllDecks();
        setDecks(fetchedDecksInfo.decks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDecks();
  }, []);

  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const filteredDecks = decks.filter((deck) =>
    deck.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleShowNewsPopUp = () => {
    setNewsPopUpVisible((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <MainContainer>
      {newsPopUpVisible && (
        <NewsPopUp toggleShowNewsPopUp={toggleShowNewsPopUp}/>
      )}
      <div className="flex flex-col bg-slate-900 p-10 min-w-full align-middle clip-diagonal gap-3 slide-in-from-top" style={{backgroundImage: `url(${AtemBackground.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <h1 className="text-xl md:text-4xl">Yu-Gi-Oh! Combo Maker</h1>
      </div>
      <div className="fixed top-5 left-5 flex justify-center items-center clip-diagonal-small">
        <p className="p-2 pl-3 bg-slate-800 pointer-events-none">V1.3.1</p>
        <button className="p-2 bg-white/70  text-slate-800 font-bold cursor-pointer hover:bg-white/90" onClick={toggleShowNewsPopUp}>What´s new?</button>
      </div>
      <MainWrapper>
        <input
          type="text"
          placeholder="Search for a deck.. "
          className="w-full p-3 pl-7 mb-2 bg-white/80 text-slate-800 clip-diagonal m-auto max-w-[90%]"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-col justify-between items-center flex-1">
          {decks.length === 0 ? (
            <div className="flex flex-col justify-center items-center flex-1">
              <p className="text-xl text-white/50">No decks found :{"("}</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredDecks
                  .slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    currentPage * ITEMS_PER_PAGE
                  )
                  .map((deck) => (
                    <DeckBox
                      key={deck.id}
                      deck={deck}
                      onClick={() => goToPage(deck.id)}
                    />
                  ))}
              </div>
            </div>
          )}
          {totalPages > 1 && (
            <PaginationController
              currentPage={currentPage - 1}
              totalPages={totalPages - 1}
              goBack={goBack}
              goNext={goNext}
            />
          )}
        </div>
      </MainWrapper>
    </MainContainer>
  );
}
