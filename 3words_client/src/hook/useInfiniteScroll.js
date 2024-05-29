import { useState, useRef, useEffect } from "react";

const useInfiniteScroll = (
    numberOfEveryFetched,
    sortStandard,
    url,
    containerClass,
    scrollPosition,
    fetchedWordsProposalData
) => {
    const [fetchedData, setFetchedData] = useState(
        fetchedWordsProposalData && fetchedWordsProposalData.length > 0
            ? fetchedWordsProposalData
            : []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isLastData, setIsLastData] = useState(
        fetchedWordsProposalData &&
            fetchedWordsProposalData.length % numberOfEveryFetched !== 0
            ? true
            : false
    );

    const scrollInformation = useRef({ root: null, scrollTo: null });

    let fetchedCount =
        fetchedData.length === 0
            ? 0
            : fetchedData.length / numberOfEveryFetched;

    const fetchData = async () => {
        if (isLastData) {
            return;
        }
        setIsLoading(true);
        const response = await fetch(
            url +
                `?n=${numberOfEveryFetched}&c=${fetchedCount}&s=${sortStandard}`
        );
        const { data } = await response.json();
        if (data.length < numberOfEveryFetched) {
            setFetchedData((prev) => [...prev, ...data]);
            setIsLastData(true);
            setIsLoading(false);
            return;
        }
        setFetchedData((prev) => [...prev, ...data]);
        setIsLoading(false);
    };

    useEffect(() => {
        if (fetchedData.length > 0) {
            return;
        }
        fetchData();
    }, []);

    const infiniteScrollObserver = async () => {
        if (fetchedCount > 1 && scrollInformation.current.scrollTo) {
            scrollInformation.current.root.scrollTo(
                0,
                scrollInformation.current.scrollTo
            );
        }

        const root = document.querySelector(
            `.${containerClass}.infinite-scroll-container`
        );

        scrollInformation.current.root = root;

        const options = {
            root,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    scrollInformation.current.scrollTo = root.scrollTop;
                    fetchData();
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);

        const target = root.lastChild;

        observer.observe(target);
    };

    useEffect(() => {
        if (fetchedCount > 0) {
            infiniteScrollObserver();
        }
    }, [fetchedData]);

    useEffect(() => {
        if (scrollPosition) {
            const root = document.querySelector(
                `.${containerClass}.infinite-scroll-container`
            );
            root.scrollTo(0, scrollPosition);
        }
    }, []);
    return { fetchedData, isLoading };
};

export default useInfiniteScroll;
