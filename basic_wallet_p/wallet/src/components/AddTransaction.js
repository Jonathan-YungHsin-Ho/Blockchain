import React, { useState } from 'react';

export default function AddTransaction() {
	const [transaction, setTransaction] = useState({
		sender: '',
		recipient: '',
		amount: 0,
	});

	const baseURL = 'http://localhost:5000';

	const handleChange = e => {
		setTransaction({ ...transaction, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		setTransaction({ ...transaction, amount: Number(transaction.amount) });

		fetch(`${baseURL}/transactions/new`, {
			method: 'post',
			body: JSON.stringify(transaction),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				// console.log(res);
				setTransaction({ sender: '', recipient: '', amount: 0 });
			})
			.catch(err => console.log(err));
	};

	return (
		<section>
			<h2>Add Transaction</h2>
			<form>
				<label>
					Sender:
					<input
						type='text'
						name='sender'
						value={transaction.sender}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Recipient:
					<input
						type='text'
						name='recipient'
						value={transaction.recipient}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Amount:
					<input
						type='text'
						name='amount'
						value={transaction.amount}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button onClick={handleSubmit}>Submit</button>
			</form>
		</section>
	);
}
