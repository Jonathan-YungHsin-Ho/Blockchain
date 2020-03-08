import React from 'react';

export default function Transaction({ transaction, id }) {
	return (
		<p style={{ color: id === transaction.recipient ? 'green' : 'red' }}>
			{transaction.sender} paid {transaction.recipient} {transaction.amount}{' '}
			coin(s)
		</p>
	);
}
