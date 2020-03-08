import React, { useState, useEffect } from 'react';
import './App.css';

import Transaction from './components/Transaction';
import AddTransaction from './components/AddTransaction';

function App() {
	const [data, setData] = useState({
		id: '',
		balance: 0,
		allTransactions: [],
		filteredTransactions: [],
	});

	const baseURL = 'http://localhost:5000';

	const fetchData = () => {
		fetch(`${baseURL}/chain`)
			.then(res => res.json())
			.then(res => {
				// console.log(res.chain);
				const allTransactions = res.chain
					.map(block => block.transactions)
					.flat();
				setData({ ...data, allTransactions });
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const filteredTransactions = data.allTransactions.filter(
			transaction =>
				transaction.sender === data.id || transaction.recipient === data.id,
		);

		const balance =
			filteredTransactions
				.filter(transaction => transaction.recipient === data.id)
				.reduce((acc, val) => acc + val.amount, 0) -
			filteredTransactions
				.filter(transaction => transaction.sender === data.id)
				.reduce((acc, val) => acc + val.amount, 0);

		setData({ ...data, filteredTransactions, balance });
	}, [data.id, data.allTransactions]);

	const handleChange = e => setData({ ...data, id: e.target.value });

	const handleClick = () => fetchData();

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Blockchain Wallet</h1>
				<input
					type='text'
					name='id'
					placeholder='Enter ID here'
					value={data.id}
					onChange={handleChange}
				/>
				<button onClick={handleClick}>Refetch</button>
			</header>
			<div className='body'>
				<section>
					<h2>Wallet Data</h2>
					<div className='data-row'>
						<h3>ID: </h3>
						<p>{data.id}</p>
					</div>
					<div className='data-row'>
						<h3>Current Balance: </h3>
						<p>{data.balance} coin(s)</p>
					</div>
					<div>
						<h3>Transactions:</h3>
						<div>
							{data.filteredTransactions.map((transaction, index) => (
								<Transaction
									key={index}
									transaction={transaction}
									id={data.id}
								/>
							))}
						</div>
					</div>
				</section>
				<AddTransaction />
			</div>
		</div>
	);
}

export default App;
