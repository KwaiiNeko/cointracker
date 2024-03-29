import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinTitle from "./CoinTitle";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "./Carousel";
import Modal from "./Modal";
import useCookies from "./useCookies";

const StyledTable = styled.table`
  margin: 0 auto;
  width: 70%;
  border-collapse: collapse;

  @media all and (max-width: 767px) {
    font-size: 13px;

    td:nth-child(5) {
      display: none;
    }

    th:nth-child(5) {
      display: none;
    }

    td:nth-child(6) {
      display: none;
    }

    th:nth-child(6) {
      display: none;
    }
  }

  thead tr {
    border-bottom: ${(props) => props.theme.borderColor};
  }

  .red {
    color: red;
  }

  .blue {
    color: blue;
  }

  .percentChange {
    text-align: right;
  }

  a {
    text-decoration: none;
  }
  a:visited {
    color: blue;
  }
  a:active {
    color: blue;
  }
`;

const CoinListPage = () => {
  const [coins, setCoins] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [modalOpen, setModalOpen] = useState(true);

  const [setCookie, getCookie, deleteCookie] = useCookies();

  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        "https://api.coinpaprika.com/v1/tickers?quotes=KRW"
      );

      setCoins(response.data.slice(0, 100));
    } catch (e) {}
  };

  useEffect(() => {
    fetchCoins();
    if (getCookie("modalYN") === "N") {
      setModalOpen(false);
      document.body.style.overflow = "unset";
    }
  }, []);

  return (
    <>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}

      <Carousel></Carousel>

      <CoinTitle
        CallApi={fetchCoins}
        setData={setInputValue}
        value={inputValue}
      />
      <StyledTable coin={coins}>
        <thead>
          <tr>
            <th>#</th>
            <th>종목</th>
            <th>기호</th>
            <th>가격(KRW)</th>
            <th>총 시가</th>
            <th>거래량(24H)</th>
            <th>변동(24H)</th>
            <th>변동(7D)</th>
          </tr>
        </thead>

        <tbody>
          {coins
            .filter((coin) =>
              coin.name.toLowerCase().includes(inputValue.toLocaleLowerCase())
            )
            .map((coin) => (
              <tr>
                <td>{coin.rank}</td>
                <td>
                  <Link
                    to={`coin/${coin.id}`}
                    state={{
                      name: coin.name,
                      id: coin.id,
                    }}
                  >
                    {coin.name}
                  </Link>
                </td>
                <td>{coin.symbol}</td>
                <td>￦{Number(coin.quotes.KRW.price.toFixed(2)).toLocaleString('ko-KR')}</td>
                <td>{Number(coin.quotes.KRW.market_cap.toFixed(0)).toLocaleString('ko-KR')}</td>
                <td>{Number(coin.quotes.KRW.volume_24h.toFixed(0)).toLocaleString('ko-KR')}</td>
                <td
                  className={`percentChange ${
                    coin.quotes.KRW.percent_change_24h >= 0 ? "red" : "blue"
                  }`}
                >
                  {coin.quotes.KRW.percent_change_24h}%
                </td>
                <td
                  className={`percentChange ${
                    coin.quotes.KRW.percent_change_7d >= 0 ? "red" : "blue"
                  }`}
                >
                  {coin.quotes.KRW.percent_change_7d}%
                </td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </>
  );
};

export default CoinListPage;
