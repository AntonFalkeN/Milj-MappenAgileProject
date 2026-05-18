import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../context/useAuth.js";
import "./ListingPage.css";
import Footer from "../components/Footer";
import Button from "../components/Button";

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

const ListingPage = () => {
  const {user} = useAuth();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);
  const [results, setResults] = useState([]);
  const skipNextChange = useRef(false);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [PickupTime, setPickupTime] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pickupDuration, setPickupDuration] = useState("");
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const categoryOptions = [
    { label: "Plastic bottles", value: "plasticBottles" },
    { label: "Cans", value: "cans" },
    { label: "Other recycling", value: "otherRecycling" },
  ];

  const pickupDurationOptions = [
    { label: "1 hour", value: 1 },
    { label: "3 hours", value: 3 },
    { label: "6 hours", value: 6 },
    { label: "12 hours", value: 12 },
    { label: "24 hours", value: 24 },
  ];


  // happenes when the query updates
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (skipNextChange.current) {
      skipNextChange.current = false;
      return;
    }

    setLocation({
      lat: "",
      lng: "",
      title: ""
    });

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchAddress(query);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const searchAddress = async (q) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        q,
        format: 'json',
        addressdetails: 1,
        limit: 5,
      });
      const res = await fetch(`${NOMINATIM_URL}?${params}`, {
        headers: {
          'User-Agent': 'WasteWatchersApp',
        },
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    skipNextChange.current = true;  
    const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
    const split = item.display_name.split(',');
    var title;
    if (isNumber(split[0])) {
      title = split[1] + " " + split[0];
    }
    else {
      title = split[0];
    }
    setQuery(title);
    setLocation({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      title: title
    });
    setResults([]);
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      console.log("No category selected");
      return;
    }

    if (!location.title.trim()) {
      console.log("No address selected");
      return;
    }

    if (!location.lng || !location.lat) {
      console.log("There was an error with the address");
      return;
    }

    if (!description.trim()) {
      console.log("No description entered");
      return;
    }

    if (!pickupDuration) {
      console.log("No pickup duration selected");
      return;
    }

    const firstPickupTime = new Date();
    const lastPickupTime = new Date(
      firstPickupTime.getTime() + Number(pickupDuration) * 60 * 60 * 1000,
    );

    const pickupData = {
      username: user,
      title: location.title,
      lng: location.lng,
      lat: location.lat,
      description: description.trim(),
      category: selectedCategory.value,
      startTime: firstPickupTime.toISOString(),
      endTime: lastPickupTime.toISOString(),
    };

    deliverPin(pickupData);
  };

  async function deliverPin(marker) { //take marker as parameter
    console.log("Delivering pin:", marker);
    const backendUrl = import.meta.env.VITE_API_URL;

    const res = await fetch(`${backendUrl}/api/items`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(marker),
    });
    const data = await res.json();
    console.log(data);
  }


  return (
    <div className="listingPage">
      <main className="listingPageContent">
        <svg
          className="listingPageHeaderSvg"
          viewBox="0 0 440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="21"
            cy="15.5"
            rx="21"
            ry="15.5"
            transform="matrix(-1 0 0 1 458 109)"
            fill="#2D3F27"
          />
          <ellipse
            cx="21"
            cy="15.5"
            rx="21"
            ry="15.5"
            transform="matrix(-1 0 0 1 458 109)"
            fill="black"
            fill-opacity="0.2"
          />
          <ellipse cx="5" cy="117.5" rx="22" ry="15.5" fill="#2D3F27" />
          <ellipse
            cx="5"
            cy="117.5"
            rx="22"
            ry="15.5"
            fill="black"
            fill-opacity="0.2"
          />
          <ellipse cx="32.5" cy="94" rx="49.5" ry="24" fill="#2D3F27" />
          <ellipse
            cx="32.5"
            cy="94"
            rx="49.5"
            ry="24"
            fill="black"
            fill-opacity="0.2"
          />
          <ellipse
            cx="47.5"
            cy="24"
            rx="47.5"
            ry="24"
            transform="matrix(-1 0 0 1 458 77)"
            fill="#2D3F27"
          />
          <ellipse
            cx="47.5"
            cy="24"
            rx="47.5"
            ry="24"
            transform="matrix(-1 0 0 1 458 77)"
            fill="black"
            fill-opacity="0.2"
          />
          <rect width="440" height="100" fill="#2D3F27" />
          <rect width="440" height="100" fill="black" fill-opacity="0.2" />
          <g filter="url(#filter0_d_6_39)">
            <path
              d="M46.824 70.576C43.4 70.576 40.632 69.376 38.52 66.976C36.408 64.576 35.352 61.424 35.352 57.52C35.352 53.584 36.088 50.016 37.56 46.816C39.032 43.584 41.144 40.96 43.896 38.944C46.648 36.928 49.688 35.92 53.016 35.92C53.976 35.92 55 36.064 56.088 36.352C58.392 34.88 60.68 34.144 62.952 34.144C64.104 34.144 65.176 34.32 66.168 34.672C67.192 34.992 67.944 35.392 68.424 35.872C68.168 37.088 67.816 38.128 67.368 38.992L67.176 39.424C65.672 38.304 64.056 37.744 62.328 37.744C61.432 37.744 60.456 37.936 59.4 38.32C60.872 39.92 61.608 42.16 61.608 45.04C61.608 47.888 60.856 50.544 59.352 53.008C57.848 55.44 55.896 56.656 53.496 56.656C51.992 56.656 50.76 56.048 49.8 54.832C48.84 53.616 48.36 52.064 48.36 50.176C48.36 46.336 49.72 42.816 52.44 39.616C50.264 39.808 48.44 41.488 46.968 44.656C45.528 47.792 44.808 51.248 44.808 55.024C44.808 61.904 46.52 65.344 49.944 65.344C52.504 65.344 55.368 63.648 58.536 60.256L60.792 62.176C60.376 62.88 59.656 63.792 58.632 64.912C57.608 66 56.584 66.912 55.56 67.648C54.568 68.384 53.272 69.056 51.672 69.664C50.104 70.272 48.488 70.576 46.824 70.576ZM53.688 53.008C54.648 53.008 55.432 52.224 56.04 50.656C56.68 49.056 57 47.232 57 45.184C57 43.136 56.568 41.648 55.704 40.72C53.048 43.312 51.72 46.416 51.72 50.032C51.72 50.992 51.896 51.728 52.248 52.24C52.6 52.752 53.08 53.008 53.688 53.008ZM62.6333 70.288H62.2493C62.1533 69.84 62.1053 69.152 62.1053 68.224C62.1053 67.264 62.4893 64.816 63.2573 60.88C64.0573 56.912 64.4573 54.672 64.4573 54.16C64.4573 53.616 64.3133 53.072 64.0253 52.528C63.7373 51.952 63.4493 51.52 63.1613 51.232L62.7293 50.8L62.8253 50.08C64.7453 49.472 67.9293 49.168 72.3773 49.168C72.7933 49.968 73.0493 50.912 73.1453 52C75.0973 49.824 76.8253 48.736 78.3293 48.736C80.2813 48.736 81.3533 50.384 81.5453 53.68C81.4813 53.744 81.4013 53.856 81.3053 54.016C81.2093 54.144 80.9853 54.384 80.6333 54.736C80.2813 55.088 79.9133 55.408 79.5293 55.696C78.4413 56.432 77.2893 56.864 76.0733 56.992C76.0413 56.992 75.8173 56.64 75.4013 55.936C75.0173 55.232 74.6813 54.88 74.3932 54.88C74.1373 54.88 73.6413 55.168 72.9053 55.744C72.8093 56.32 72.6173 57.296 72.3293 58.672C72.0733 60.048 71.8653 61.184 71.7053 62.08C71.2253 64.448 70.9853 66.432 70.9853 68.032L71.0333 69.472C69.6253 70.016 66.8253 70.288 62.6333 70.288ZM80.0381 61.312C80.0381 57.344 81.2381 54.256 83.6381 52.048C86.0701 49.84 89.0621 48.736 92.6141 48.736C95.0781 48.736 97.0461 49.28 98.5181 50.368C100.022 51.424 100.774 52.848 100.774 54.64C100.774 55.952 100.374 57.12 99.5741 58.144C98.7741 59.168 97.7981 59.952 96.6461 60.496C94.2141 61.584 92.1021 62.24 90.3101 62.464L89.1101 62.608C89.4621 64.72 90.5181 65.776 92.2781 65.776C93.0461 65.776 93.8941 65.616 94.8221 65.296C95.7501 64.944 96.4861 64.592 97.0301 64.24L97.8461 63.76L99.3821 65.824C99.3821 65.824 99.2061 66 98.8541 66.352C98.6621 66.544 98.1981 66.928 97.4621 67.504C96.7581 68.048 96.0061 68.528 95.2061 68.944C94.4381 69.36 93.4461 69.728 92.2301 70.048C91.0141 70.4 89.7981 70.576 88.5821 70.576C85.8621 70.576 83.7501 69.792 82.2461 68.224C80.7741 66.624 80.0381 64.32 80.0381 61.312ZM88.9181 59.44C89.8461 59.312 90.7741 58.56 91.7021 57.184C92.6301 55.776 93.0941 54.608 93.0941 53.68C93.0941 52.72 92.8221 52.24 92.2781 52.24C91.4781 52.24 90.7421 52.864 90.0701 54.112C89.3981 55.36 89.0141 57.136 88.9181 59.44ZM124.848 50.56C124.176 52.64 123.6 55.12 123.12 58C122.64 60.848 122.4 62.848 122.4 64C122.4 65.12 122.576 65.68 122.928 65.68L125.328 65.008L126.192 67.408C125.168 68.208 123.856 68.944 122.256 69.616C120.688 70.256 119.296 70.576 118.08 70.576C116 70.576 114.688 69.68 114.144 67.888C111.616 69.68 109.376 70.576 107.424 70.576C105.504 70.576 104.016 69.872 102.96 68.464C101.904 67.056 101.376 65.04 101.376 62.416C101.376 58.8 102.304 55.616 104.16 52.864C106.016 50.112 108.464 48.736 111.504 48.736C113.168 48.736 114.864 49.2 116.592 50.128C116.848 49.552 117.056 49.136 117.216 48.88C119.52 48.88 122.064 49.44 124.848 50.56ZM110.4 61.84C110.4 63.44 110.512 64.448 110.736 64.864C110.96 65.28 111.376 65.488 111.984 65.488C112.592 65.488 113.184 65.248 113.76 64.768C113.888 61.056 114.496 57.168 115.584 53.104C115.104 52.816 114.544 52.672 113.904 52.672C113.296 52.672 112.736 53.024 112.224 53.728C111.744 54.432 111.376 55.312 111.12 56.368C110.64 58.384 110.4 60.208 110.4 61.84ZM143.34 53.008L139.212 52.672C137.932 58.4 137.228 61.728 137.1 62.656C137.004 63.584 136.956 64.352 136.956 64.96C136.956 65.536 137.148 65.824 137.532 65.824C137.98 65.824 138.828 65.536 140.076 64.96L141.228 67.264C140.204 68.192 138.908 68.976 137.34 69.616C135.772 70.256 134.252 70.576 132.78 70.576C131.34 70.576 130.188 70.208 129.324 69.472C128.46 68.704 128.028 67.632 128.028 66.256C128.028 64.88 128.428 62.672 129.228 59.632C130.028 56.592 130.556 54.336 130.812 52.864C130.044 52.928 128.908 53.04 127.404 53.2C127.276 52.528 127.212 51.904 127.212 51.328C127.212 50.72 127.292 50.048 127.452 49.312H131.292C131.324 48.896 131.34 47.504 131.34 45.136L131.244 43.168C134.348 42.144 137.308 41.632 140.124 41.632C140.348 42.144 140.46 43.04 140.46 44.32C140.46 45.568 140.252 47.232 139.836 49.312H144.156C144.156 50.624 143.884 51.856 143.34 53.008ZM142.663 61.312C142.663 57.344 143.863 54.256 146.263 52.048C148.695 49.84 151.687 48.736 155.239 48.736C157.703 48.736 159.671 49.28 161.143 50.368C162.647 51.424 163.399 52.848 163.399 54.64C163.399 55.952 162.999 57.12 162.199 58.144C161.399 59.168 160.423 59.952 159.271 60.496C156.839 61.584 154.727 62.24 152.935 62.464L151.735 62.608C152.087 64.72 153.143 65.776 154.903 65.776C155.671 65.776 156.519 65.616 157.447 65.296C158.375 64.944 159.111 64.592 159.655 64.24L160.471 63.76L162.007 65.824C162.007 65.824 161.831 66 161.479 66.352C161.287 66.544 160.823 66.928 160.087 67.504C159.383 68.048 158.631 68.528 157.831 68.944C157.063 69.36 156.071 69.728 154.855 70.048C153.639 70.4 152.423 70.576 151.207 70.576C148.487 70.576 146.375 69.792 144.871 68.224C143.399 66.624 142.663 64.32 142.663 61.312ZM151.543 59.44C152.471 59.312 153.399 58.56 154.327 57.184C155.255 55.776 155.719 54.608 155.719 53.68C155.719 52.72 155.447 52.24 154.903 52.24C154.103 52.24 153.367 52.864 152.695 54.112C152.023 55.36 151.639 57.136 151.543 59.44ZM172.123 80.752C171.867 80.336 171.739 79.456 171.739 78.112C171.739 76.768 172.347 73.12 173.563 67.168C174.811 61.216 175.435 57.488 175.435 55.984C175.435 54.48 175.291 53.344 175.003 52.576C174.715 51.776 174.427 51.264 174.139 51.04L173.707 50.704L173.803 49.984C175.723 49.376 178.971 49.072 183.547 49.072C183.803 49.552 184.011 50.176 184.171 50.944C186.219 49.472 188.155 48.736 189.979 48.736C191.803 48.736 193.291 49.44 194.443 50.848C195.627 52.224 196.219 54.576 196.219 57.904C196.219 61.232 195.339 64.176 193.579 66.736C191.851 69.296 189.307 70.576 185.947 70.576C184.475 70.576 183.035 70.288 181.627 69.712C180.891 73.328 180.523 76.512 180.523 79.264C178.219 80.096 175.419 80.592 172.123 80.752ZM183.739 66.544C184.603 66.544 185.339 65.904 185.947 64.624C187.035 62.384 187.579 59.664 187.579 56.464C187.579 54.576 187.115 53.632 186.187 53.632C185.707 53.632 185.067 53.808 184.267 54.16C184.075 56.848 183.435 60.896 182.347 66.304C182.891 66.464 183.355 66.544 183.739 66.544ZM209.693 52C209.693 53.408 209.293 55.6 208.493 58.576C207.693 61.52 207.293 63.44 207.293 64.336C207.293 65.232 207.469 65.68 207.821 65.68C208.173 65.68 208.813 65.52 209.741 65.2L210.173 65.008L211.037 67.408C209.949 68.24 208.589 68.976 206.957 69.616C205.357 70.256 203.901 70.576 202.589 70.576C201.277 70.576 200.237 70.208 199.469 69.472C198.733 68.736 198.365 67.68 198.365 66.304C198.365 64.896 198.749 62.768 199.517 59.92C200.317 57.04 200.717 55.216 200.717 54.448C200.717 53.264 200.301 52.144 199.469 51.088L199.085 50.56L199.229 49.744C200.893 49.232 204.125 48.976 208.925 48.976C209.437 49.552 209.693 50.56 209.693 52ZM206.093 45.232C204.653 45.232 203.517 44.848 202.685 44.08C201.885 43.312 201.485 42.336 201.485 41.152C201.485 39.936 201.981 38.928 202.973 38.128C203.997 37.296 205.229 36.88 206.669 36.88C208.109 36.88 209.229 37.216 210.029 37.888C210.829 38.56 211.229 39.504 211.229 40.72C211.229 41.936 210.733 42.992 209.741 43.888C208.781 44.784 207.565 45.232 206.093 45.232ZM224.708 51.952C223.716 51.952 222.868 52.832 222.164 54.592C221.46 56.352 221.108 58.128 221.108 59.92C221.108 63.856 222.244 65.824 224.516 65.824C225.956 65.824 227.588 65.136 229.412 63.76L230.948 65.872C229.604 67.344 227.988 68.496 226.1 69.328C224.244 70.16 222.388 70.576 220.532 70.576C218.036 70.576 216.004 69.824 214.436 68.32C212.9 66.784 212.132 64.48 212.132 61.408C212.132 57.696 213.268 54.656 215.54 52.288C217.844 49.92 220.852 48.736 224.564 48.736C226.964 48.736 228.852 49.232 230.228 50.224C231.604 51.184 232.292 52.416 232.292 53.92C232.292 55.392 231.844 56.672 230.948 57.76C229.892 57.76 228.74 57.568 227.492 57.184C226.276 56.768 225.3 56.256 224.564 55.648L225.284 52.048C225.092 51.984 224.9 51.952 224.708 51.952ZM238.38 38.272C238.38 37.44 238.3 36.704 238.14 36.064C241.308 35.2 244.188 34.768 246.78 34.768C247.1 35.152 247.26 36 247.26 37.312C247.26 39.648 246.54 44.128 245.1 50.752C247.66 49.408 249.916 48.736 251.868 48.736C253.852 48.736 255.356 49.136 256.38 49.936C257.436 50.736 257.964 51.856 257.964 53.296C257.964 56.08 255.9 58.064 251.772 59.248C252.796 63.664 253.788 65.872 254.748 65.872L257.052 65.248L258.108 67.6C257.308 68.24 256.076 68.896 254.412 69.568C252.748 70.24 251.148 70.576 249.612 70.576C248.076 70.576 246.908 70 246.108 68.848C245.308 67.696 244.796 66.192 244.572 64.336C244.348 62.48 244.236 60.4 244.236 58.096C245.772 57.712 246.988 57.168 247.884 56.464C248.78 55.728 249.228 55.008 249.228 54.304C249.228 53.568 248.844 53.2 248.076 53.2C247.468 53.2 246.748 53.376 245.916 53.728C245.116 54.08 244.524 54.416 244.14 54.736C242.412 62.032 241.548 66.912 241.548 69.376C239.084 69.92 236.156 70.192 232.764 70.192C232.732 69.936 232.716 69.632 232.716 69.28C232.716 67.616 233.66 62.752 235.548 54.688C237.436 46.592 238.38 41.12 238.38 38.272ZM259.024 66.112C259.024 64.768 259.44 62.56 260.272 59.488C261.136 56.416 261.568 54.528 261.568 53.824C261.568 53.12 260.992 52.096 259.84 50.752L259.936 50.032C262.848 49.392 266.256 49.072 270.16 49.072C270.416 49.616 270.544 50.48 270.544 51.664C270.544 52.848 270.096 55.088 269.2 58.384C268.336 61.68 267.904 63.632 267.904 64.24C267.904 65.072 268.304 65.488 269.104 65.488C269.648 65.488 270.336 65.28 271.168 64.864C271.264 64.352 271.552 63.008 272.032 60.832C273.152 56 273.712 52.384 273.712 49.984C275.184 49.344 277.696 49.024 281.248 49.024H282.544C282.544 50.464 282.112 53.28 281.248 57.472C280.416 61.664 279.984 64.08 279.952 64.72C279.952 65.36 280.096 65.68 280.384 65.68L282.736 65.056L283.6 67.456C282.672 68.192 281.328 68.896 279.568 69.568C277.808 70.24 276.256 70.576 274.912 70.576C272.928 70.576 271.696 69.776 271.216 68.176C268.56 69.776 266.016 70.576 263.584 70.576C260.544 70.576 259.024 69.088 259.024 66.112ZM283.263 80.752C283.007 80.336 282.879 79.456 282.879 78.112C282.879 76.768 283.487 73.12 284.703 67.168C285.951 61.216 286.575 57.488 286.575 55.984C286.575 54.48 286.431 53.344 286.143 52.576C285.855 51.776 285.567 51.264 285.279 51.04L284.847 50.704L284.943 49.984C286.863 49.376 290.111 49.072 294.687 49.072C294.943 49.552 295.151 50.176 295.311 50.944C297.359 49.472 299.295 48.736 301.119 48.736C302.943 48.736 304.431 49.44 305.583 50.848C306.767 52.224 307.359 54.576 307.359 57.904C307.359 61.232 306.479 64.176 304.719 66.736C302.991 69.296 300.447 70.576 297.087 70.576C295.615 70.576 294.175 70.288 292.767 69.712C292.031 73.328 291.663 76.512 291.663 79.264C289.359 80.096 286.559 80.592 283.263 80.752ZM294.879 66.544C295.743 66.544 296.479 65.904 297.087 64.624C298.175 62.384 298.719 59.664 298.719 56.464C298.719 54.576 298.255 53.632 297.327 53.632C296.847 53.632 296.207 53.808 295.407 54.16C295.215 56.848 294.575 60.896 293.487 66.304C294.031 66.464 294.495 66.544 294.879 66.544Z"
              fill="white"
            />
          </g>
          <ellipse cx="401" cy="49" rx="15" ry="14" fill="#D9D9D9" />
          <line
            x1="386.69"
            y1="74.4649"
            x2="396.69"
            y2="57.4649"
            stroke="white"
            stroke-width="10"
          />
          <defs>
            <filter
              id="filter0_d_6_39"
              x="31.3521"
              y="34.144"
              width="280.007"
              height="54.608"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_6_39"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_6_39"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <section className="listingPageFormSection">
          <div className="listingDropdown">
            <button
              className={
                isDropdownOpen
                  ? "listingDropdownButton open"
                  : "listingDropdownButton"
              }
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span
                className={
                  selectedCategory
                    ? "listingDropdownText selected"
                    : "listingDropdownText"
                }
              >
                {selectedCategory ? selectedCategory.label : "Select item"}
              </span>

              <svg
                className={
                  isDropdownOpen
                    ? "listingDropdownArrow open"
                    : "listingDropdownArrow"
                }
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#1f351f"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="listingDropdownMenu">
                {categoryOptions.map((categoryOption) => (
                  <button
                    key={categoryOption.value}
                    className="listingDropdownOption"
                    type="button"
                    onClick={() => {
                      setSelectedCategory(categoryOption);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {categoryOption.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="listingTextInputWrapper">
            <input
              className="listingTextInput"
              type="text"
              placeholder="Address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {loading && <div className="infoText">Searching...</div>}
            {error && <div className="errorText">{error}</div>}

            {results.length > 0 && (
              <ul className="resultsList">
                {results.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelect(item)}
                    className="resultItem"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="listingTextInputWrapper">
            <textarea
              className="listingDescriptionInput"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="listingDropdown timeDropdown">
            <button
              className={
                isTimeDropdownOpen
                  ? "listingDropdownButton open"
                  : "listingDropdownButton"
              }
              type="button"
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
            >
              <span
                className={
                  pickupDuration
                    ? "listingDropdownText selected"
                    : "listingDropdownText"
                }
              >
                {pickupDuration
                  ? pickupDurationOptions.find(
                      (durationOption) =>
                        String(durationOption.value) === String(pickupDuration),
                    )?.label
                  : "Available for"}
              </span>

              <svg
                className={
                  isTimeDropdownOpen
                    ? "listingDropdownArrow open"
                    : "listingDropdownArrow"
                }
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#1f351f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isTimeDropdownOpen && (
              <div className="listingDropdownMenu">
                {pickupDurationOptions.map((durationOption) => (
                  <button
                    key={durationOption.value}
                    className="listingDropdownOption"
                    type="button"
                    onClick={() => {
                      setPickupDuration(durationOption.value);
                      setIsTimeDropdownOpen(false);
                    }}
                  >
                    {durationOption.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="publishButtonWrapper">
            <Button
              text="Publish"
              variant="publish-button"
              onClick={handleSubmit}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ListingPage;
