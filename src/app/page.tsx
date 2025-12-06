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
import AtemBackground from "../../public/images/atem_background.png";
import CardQuizPopUp from "@/components/cardQuizPopUp";
import ToolsPopUp from "@/components/toolsPopUp";
import { TbCards } from "react-icons/tb";
import { LiaToolsSolid } from "react-icons/lia";


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
  const [cardQuizPopUpVisible, setCardQuizPopUpVisible] = useState(false);
  const [toggleToolsPopUpVisible, setToggleToolsPopUpVisible] = useState(false);

  const ITEMS_PER_PAGE = useMemo(() => {
    if (windowWidth >= 768) return 15;
    if (windowWidth >= 640) return 10;
    return 5;
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

  const toggleCardQuizPopUp = () => {
    setCardQuizPopUpVisible((prev) => !prev);
  };

  const toggleToolsPopUp = () => {
    setToggleToolsPopUpVisible((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <MainContainer>
      {newsPopUpVisible && (
        <NewsPopUp toggleShowNewsPopUp={toggleShowNewsPopUp} />
      )}
      {cardQuizPopUpVisible && (
        <CardQuizPopUp toggleCardQuizPopUp={toggleCardQuizPopUp} />
      )}
      {toggleToolsPopUpVisible && (
        <ToolsPopUp toggleToolsPopUpVisible={toggleToolsPopUp} />
      )}

      <div
        className="flex flex-col bg-slate-900 p-10 min-w-full align-middle clip-diagonal gap-3 slide-in-from-top mt-15 md:mt-5 lg:mt-0"
        style={{
          backgroundImage: `url(${AtemBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-xl md:text-4xl">Yu-Gi-Oh! Combo Maker</h1>
      </div>

      <div
        className="
          fixed 
          top-5 
          left-1/2 -translate-x-1/2 
          flex flex-row lg:flex-col 
          items-start 
          gap-3 
          lg:top-5 lg:left-5 lg:translate-x-0
        "
      >
        <div className="hidden lg:flex items-center clip-diagonal-small overflow-visible">
          <span className="px-3 py-2 bg-slate-800 text-white select-none">
            V1.4.0
          </span>
          <button
            onClick={toggleShowNewsPopUp}
            className="px-3 py-2 bg-white/70 text-slate-800 font-semibold hover:bg-white/90 transition-colors cursor-pointer"
          >
            What`s new?
          </button>
        </div>
        <div className="flex items-center clip-diagonal-small overflow-visible h-10">
          <span className="px-3 bg-slate-800 h-full flex items-center text-white select-none">
            <TbCards className="text-xl" />
          </span>
          <button
            onClick={toggleCardQuizPopUp}
            className="px-3 bg-white/70 h-full flex items-center text-slate-800 font-semibold hover:bg-white/90 transition-colors cursor-pointer"
          >
            Card quiz
          </button>
        </div>
        <div className="flex items-center clip-diagonal-small overflow-visible h-10">
          <span className="px-3 bg-slate-800 h-full flex items-center text-white select-none">
            <LiaToolsSolid className="text-xl" />
          </span>
          <button
            onClick={toggleToolsPopUp}
            className="px-3 bg-white/70 h-full flex items-center text-slate-800 font-semibold hover:bg-white/90 transition-colors cursor-pointer"
          >
            Tools
          </button>
        </div>
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
