import { useState } from "react";
import cities from '../lib/city.list.json';
import Link from 'next/link'
import Style from '../styles/SearchBox.module.scss'

const SearchBox = () => {

    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    const searchHandler = (e) => {
        const { value } = e.target
        setSearch(value);

        let matchingCities = [];

        if (value.length >= 4) {
            for (let City of cities) {
                if (matchingCities >= 5) {
                    break;
                }

                const match = City.name.toLowerCase().startsWith(value.toLowerCase());

                if (match) {
                    matchingCities.push(City)
                }
            }
        }

        return setResult(matchingCities)
    }

    const loadingHandler = () => {

    }

    return (
        <div className={Style.container}>
            <input type='text' placeholder="Search City ..." onChange={searchHandler} value={search} />

            {search.length >= 4 && (
                <ul>
                    {result.length > 0 ? (
                        result.map(item => (
                            <li key={item.id}>
                                <Link href={`/location/${item.name}-${item.id}`} onClick={loadingHandler}>
                                    <a>
                                        {item.name} - {item.country}
                                    </a>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>No results</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SearchBox;