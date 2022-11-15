import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
				/>

				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			{children}
		</>
	);
}
