import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FaRegQuestionCircle } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  display: inline-block;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }

  .tooltip {
    white-space: pre-line;
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #eef3fd;
    border: #7689fd solid 1px;
    border-radius: 5px;
    color: #505bf0;
    font-size: 12px;
    font-weight: 500;
    height: auto;
    letter-spacing: -0.25px;
    margin-top: 6.8px;
    padding: 5px 11px;
    width: max-content;
    z-index: 100;
    transform: translate(-44%, 110%);
  }

  .tooltip::after {
    border-color: #eef3fd transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: -7px;
    width: 0;
    z-index: 1;
  }

  .tooltip::before {
    border-color: #7689fd transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: -8px;
    width: 0;
    z-index: 0;
  }
`;

const MainContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

const StyledTable = styled.table`
  width: 95%;
  border: 1px black solid;
  margin: 20px;
  padding: 10px;

  td {
    text-align: center;
  }
`;

const kmbt = `k = 1,000
m = 1,000,000
b = 1,000,000,000
t = 1,000,000,000,000`;


const Tooltip = ({ children, message }) => {
  return (
    <Container>
      {children}
      <div className="tooltip">{message}</div>
    </Container>
  );
};

const CoinItemPage = () => {
  const location = useLocation();
  const urlCoinId = useParams(); // 주소 링크의 coin id값

  const [selected, setSelected] = useState("interval1hour");

  const [interval1hour, setInterval1Hour] = useState([]);
  const [interval1day, setInterval1Day] = useState([]);
  const [interval7day, setInterval7Day] = useState([]);
  const [interval30day, setInterval30Day] = useState([]);

  // Wed Dec 14 2022 17:55:16 GMT+0900 (한국 표준시)
  const date = new Date();
  // '2022-12-14'
  const today = date.toISOString().substring(0, 10);
  // '2022-11-15'
  const monthAgo = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDate() + 2
  )
    .toISOString()
    .substring(0, 10);
  // '2021-12-15'
  const yearAgo = new Date(
    date.getFullYear() - 1,
    date.getMonth(),
    date.getDate() + 2
  )
    .toISOString()
    .substring(0, 10);

  const optionSelects = [
    {
      a: urlCoinId.id,
      b: today,
      c: "1h",
      d: setInterval1Hour,
    },
    {
      a: urlCoinId.id,
      b: monthAgo,
      c: "1d",
      d: setInterval1Day,
    },
    {
      a: urlCoinId.id,
      b: yearAgo,
      c: "7d",
      d: setInterval7Day,
    },
    {
      a: urlCoinId.id,
      b: yearAgo,
      c: "30d",
      d: setInterval30Day,
    },
  ];

  const [dataset, setDataSet] = useState({
    labels: interval1hour.map((day) =>
      new Date(day.timestamp).toLocaleString()
    ),
    datasets: [
      {
        type: "line",
        label: "가격(USD)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: interval1hour.map((day) => day.price),
      },
    ],
  });

  useEffect(() => {
    const fetchCoins = async (a, b, c, d) => {
      try {
        const response = await axios.get(
          `https://api.coinpaprika.com/v1/tickers/${a}/historical?start=${b}&interval=${c}`
        );
        d(response.data);
      } catch (e) {}
    };

    optionSelects.map((optionSelect) => {
      fetchCoins(
        optionSelect.a,
        optionSelect.b,
        optionSelect.c,
        optionSelect.d
      );
    });
  }, []);

  useEffect(() => {
    setDataSet({
      labels: interval1hour.map((day) =>
        new Date(day.timestamp).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      datasets: [
        {
          type: "line",
          label: "가격(USD)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 2,
          data: interval1hour.map((day) => day.price),
        },
      ],
    });
  }, [interval1hour]);

  useEffect(() => {
    if (selected === "interval1hour") {
      setDataSet({
        labels: interval1hour.map((day) =>
          new Date(day.timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
        datasets: [
          {
            type: "line",
            label: "가격(USD)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 2,
            data: interval1hour.map((day) => day.price),
          },
        ],
      });
    } else if (selected === "interval1day") {
      setDataSet({
        labels: interval1day.map((day) =>
          new Date(day.timestamp).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        ),
        datasets: [
          {
            type: "line",
            label: "가격(USD)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 2,
            data: interval1day.map((day) => day.price),
          },
        ],
      });
    } else if (selected === "interval7day") {
      setDataSet({
        labels: interval7day.map((day) =>
          new Date(day.timestamp).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        ),
        datasets: [
          {
            type: "line",
            label: "가격(USD)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 2,
            data: interval7day.map((day) => day.price),
          },
        ],
      });
    } else if (selected === "interval30day") {
      setDataSet({
        labels: interval30day.map((day) =>
          new Date(day.timestamp).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        ),
        datasets: [
          {
            type: "line",
            label: "가격(USD)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 2,
            data: interval30day.map((day) => day.price),
          },
        ],
      });
    }
  }, [selected]);

  /**
 * k,m,b 숫자단위 계산. 소수점 2자리 표시
 * @param {number} num 항목에 대한 고유 식별자
 * @returns {string} 소수점 제거값 + 단위(kmb)
 */
  const kmbtCalc = (num) => {
    if (num < 1000000) return `${(num / 1000).toFixed(2)}k`;
    if (num < 1000000000) return `${(num / 1000000).toFixed(2)}m`;
    if (num < 1000000000000) return `${(num / 1000000000).toFixed(2)}b`;
  };

  const TableBody = () => {
    if (selected === "interval1hour") {
      return (
        <tbody>
          {interval1hour.map((data) => (
            <tr>
              <td>
                {new Date(data.timestamp).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>${data.price}</td>
              <td>{kmbtCalc(data.volume_24h)}</td>
              <td>{kmbtCalc(data.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      );
    } else if (selected === "interval1day") {
      return (
        <tbody>
          {interval1day.map((data) => (
            <tr>
              <td>
                {new Date(data.timestamp).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td>{data.price}</td>
              <td>{kmbtCalc(data.volume_24h)}</td>
              <td>{kmbtCalc(data.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      );
    } else if (selected === "interval7day") {
      return (
        <tbody>
          {interval7day.map((data) => (
            <tr>
              <td>
                {new Date(data.timestamp).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td>{data.price}</td>
              <td>{kmbtCalc(data.volume_24h)}</td>
              <td>{kmbtCalc(data.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      );
    } else if (selected === "interval30day") {
      return (
        <tbody>
          {interval30day.map((data) => (
            <tr>
              <td>
                {new Date(data.timestamp).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td>{data.price}</td>
              <td>{kmbtCalc(data.volume_24h)}</td>
              <td>{kmbtCalc(data.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  const HandleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <MainContainer>
      <div>
        <h1>
          {location.state.name} _ {location.state.id}
        </h1>
      </div>

      <div>
        <span>기간 : </span>
        <select onChange={HandleSelect} value={selected}>
          <option value="interval1hour">시간</option>
          <option value="interval1day">일간</option>
          <option value="interval7day">주간</option>
          <option value="interval30day">월간</option>
        </select>
      </div>

      <Line data={dataset} />
      <StyledTable>
        <thead>
          <tr>
            <th>
              날짜
              <Tooltip message="오전 9시 기준">
                <FaRegQuestionCircle />
              </Tooltip>
            </th>
            <th>가격(USD)</th>
            <th>
              거래량(24h)
              <Tooltip message={kmbt}>
                <FaRegQuestionCircle />
              </Tooltip>
            </th>
            <th>시총</th>
          </tr>
        </thead>
        <TableBody />
      </StyledTable>
    </MainContainer>
  );
};

export default CoinItemPage;
