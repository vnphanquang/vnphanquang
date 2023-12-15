<script lang="ts">
	import Reveal from 'reveal.js';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	import learnImg from './_page/images/learn.sveltevietnam.dev.png';
	import thumbnailImg from './_page/images/thumbnail.jpg';
	import './_page/page.css';
  import { options } from './_page/reveal.config';

	function createAnimatedNumber(to: number) {
		const number = tweened(0, {
			duration: 1000,
			easing: cubicInOut,
		});

		return {
			...number,
			handlers: {
				onrevealin: () => number.set(to),
				onrevealout: () => number.set(0),
			},
		};
	}

	function formatNumber(number: number, maximumFractionDigits = 0) {
		return number.toLocaleString('vi', { maximumFractionDigits });
	}

	// dự án
	const numberAge = createAnimatedNumber(367);
	const numberEffort = createAnimatedNumber(500);
	const numberSourceCode = createAnimatedNumber(90);

	// sveltevietnam.dev
	const numberPage = createAnimatedNumber(36);
	const numberUser = createAnimatedNumber(600);
	const numberVisit = createAnimatedNumber(3.7);

	// cộng đồng
	const numberDiscordMember = createAnimatedNumber(74);

	onMount(async () => {
		const deck = new Reveal(options);

		deck.on( 'fragmentshown', event => {
			if ('fragment' in event) {
				(event.fragment as HTMLElement).dispatchEvent(new CustomEvent('revealin'));
			}
		});

		deck.on( 'fragmenthidden', event => {
			if ('fragment' in event) {
				(event.fragment as HTMLElement).dispatchEvent(new CustomEvent('revealout'));
			}
		});

		deck.initialize();
	});
</script>

<main class="reveal">
	<div class="slides">
		<!-- intro -->
		<section
			class="slide"
			data-background-image={thumbnailImg}
			data-background-size="contain"
			data-background-color="black"
		>
			<h1 class="sr-only">Nhìn lại Svelte Việt Nam 2023</h1>

			<aside class="notes">
				<p>
					Chào mọi người.
				</p>
				<p>
					Mình là Quang. Và đây là buổi gặp mặt trực tuyến cuối năm 2023, cũng là sự kiện đầu tiên của cộng đồng Svelte Việt Nam.
				</p>
				<p>
					Trong video này, hãy cùng mình nhìn lại một năm phát triển của cộng đồng, các con số khiêm tốn mà ta đã đạt được trong năm dương lịch 2023, và qua đó
					mình xin được phép chính thức giới thiệu với mọi người dự án Svelte Việt Nam.
				</p>
			</aside>
		</section>

		<section class="slide" data-transition="fade" data-auto-animate>
			<h2>Tổng quan</h2>

			<aside class="notes">
				<p>Dự án Svelte Việt Nam được mình khởi tạo vào ngày 14 tháng 12 năm 2022,</p>
				<p>__next__</p>
			</aside>
		</section>

		<section class="slide" data-transition="fade" data-auto-animate>
			<h2>Tổng quan</h2>
			<p class="text-2xl">Tính đến thời điểm này, <strong class="text-orange-500">Svelte Việt Nam</strong> đã trải qua:</p>
			<div class="stats text-left overflow-hidden fragment fade-up" {...numberAge.handlers}>

				<div class="stat">
					<div class="stat-figure">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
					</div>
					<div class="stat-title">Tuổi</div>
					<div class="stat-value text-orange-500">
						<span class="inline-block w-[3ch]">{formatNumber($numberAge)}</span>
						<span class="text-base">ngày</span>
					</div>
					<div class="stat-desc">từ 2022.12.14</div>
				</div>

				<div class="stat fragment fade-up" {...numberEffort.handlers}>
					<div class="stat-figure">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
					</div>
					<div class="stat-title">Nỗ lực</div>
					<div class="stat-value text-orange-500">
						>
						<span class="inline-block w-[3ch]">{formatNumber($numberEffort)}</span>
						<span class="text-base">giờ</span>
					</div>
					<div class="stat-desc">thiết kế và lập trình</div>
				</div>

				<div class="stat fragment fade-up" {...numberSourceCode.handlers}>
					<div class="stat-figure">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><circle cx="5" cy="6" r="3"/><path d="M5 9v6"/><circle cx="5" cy="18" r="3"/><path d="M12 3v18"/><circle cx="19" cy="6" r="3"/><path d="M16 15.7A9 9 0 0 0 19 9"/></svg>
					</div>
					<div class="stat-title">Mã nguồn</div>
					<div class="stat-value text-orange-500">
						>
						<span class="inline-block w-[2ch]">{formatNumber($numberSourceCode)}</span>k
						<span class="text-base">LOC</span>
					</div>
					<div class="stat-desc">hơn 680 commit, 100 issue, và 90 PR</div>
				</div>

				<div class="stat fragment fade-up" {...numberDiscordMember.handlers}>
					<div class="stat-figure">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
					</div>
					<div class="stat-title">Discord</div>
					<div class="stat-value text-orange-500">
						<span class="inline-block w-[2ch]">{formatNumber($numberDiscordMember)}</span>
						<span class="text-base">tv</span>
					</div>
					<div class="stat-desc">
						từ 2023.01.22
					</div>
				</div>
			</div>

			<p class="fragment">Được cồng đồng Svelte quốc tế ghi nhận</p>

			<aside class="notes">
				<p>__next__</p>
				<p>đến thời điểm này đã là 1 năm 2 ngày,</p>
				<p>__next__</p>
				<p>là kết quả của hơn 500 giờ thiết kế và lập trình,</p>
				<p>__next__</p>
				<p>với hơn 90 nghìn dòng code, hằng trăm commit, issue và pull request.</p>
				<p>__next__</p>
				<p>Thành viên cộng đồng Svelte Việt Nam trao đổi thông qua Discord, được tạo vào tháng 1 năm nay, và hiện tại đã có 74 thành viên.</p>
				<p>__next__</p>
				<p>
					Svelte Việt Nam đã được cộng đồng quốc tế ghi nhận. Discord chính thức của Svelte có đường dẫn về Discord của Svelte Việt Nam,
					và trong các sự kiện quốc tế của Svelte Soceity, khi mình trao đổi với các thành viên nước ngoài thì Svelte Việt Nam cũng đã được nhắc đến.
				</p>
			</aside>
		</section>

		<section class="slide" data-auto-animate>
			<h2>sveltevietnam.dev</h2>

			<aside class="notes">
				<p>Tiếp theo, sveltevietnam.dev là website chính thức của dự án.</p>
				<p>__next__</p>
			</aside>
		</section>

		<section class="slide" data-auto-animate>
			<h2>sveltevietnam.dev</h2>
			<p>Trong ba tháng gần nhất đã đạt:</p>
			<div class="stats text-left overflow-hidden fragment fade-up" {...numberPage.handlers}>

				<div class="stat">
					<div class="stat-figure">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
					</div>
					<div class="stat-title">Trang</div>
					<div class="stat-value text-orange-500">
						>
						<span class="inline-block w-[2ch]">{formatNumber($numberPage)}</span>
					</div>
					<div class="stat-desc">2 ngôn ngữ, 6 bài viết, 1 sự kiện</div>
				</div>

				<div class="stat fragment fade-up" {...numberUser.handlers}>
					<div class="stat-figure">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
					</div>
					<div class="stat-title">Người dùng</div>
					<div class="stat-value text-orange-500">
						>
						<span class="inline-block w-[3ch]">{formatNumber($numberUser)}</span>
					</div>
					<div class="stat-desc">hơn 40% từ Việt Nam, 18% từ Mỹ</div>
				</div>

				<div class="stat fragment fade-up" {...numberVisit.handlers}>
					<div class="stat-figure">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-click"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>
					</div>
					<div class="stat-title">Lượt truy cập</div>
					<div class="stat-value text-orange-500">
						>
						<span class="inline-block w-[2ch]">{formatNumber($numberVisit, 1)}</span>
						k
					</div>
					<div class="stat-desc">nội dung phổ biến là các trang blog</div>
				</div>
			</div>

			<p class="fragment">Cảm ơn thiết kế viên <strong class="text-green-500">Trần Đức Trọng</strong></p>

			<aside class="notes">
				<p>Trong ba tháng gần nhất, sveltevietnam.dev đã có hơn</p>
				<p>__next__</p>
				<p>36 trang với hai ngôn ngữ, 6 bài viết, và 1 sự kiện (chính là sự kiện ngày hôm nay)</p>
				<p>__next__</p>
				<p>Ta đã có hơn 600 người dùng, trong đó 40% từ Việt Nam, 18% từ Mỹ. Ngoài ra, người dùng còn đến từ nhiều quốc gia khác, tiêu biểu là Đức, Ấn Độ, Thụy Điển, Anh, Canada, Phần Lan, và Tây Ban Nha. Tổng lượng truy cập là hơn</p>
				<p>__next__</p>
				<p>3 phẩy 7 nghìn. Các bài blog là nội dung phổ biết nhất. Qua đây mình xin được gởi lời cảm ơn tới bạn Trọng là thiết kế viên chính cho trang sveltevietnam.dev</p>
				<p>__next__</p>
				<p>Một lát nữa ta sẽ bàn chi tiết hơn về trang web này</p>
			</aside>
		</section>

		<section class="slide" data-auto-animate>
			<h2>learn.sveltevietnam.dev</h2>

			<aside class="notes">
				<p>Tiếp đến, learn.sveltevietnam.dev</p>
				<p>__next__</p>
			</aside>
		</section>

		<section class="slide" data-auto-animate>
			<h2>learn.sveltevietnam.dev</h2>
			<p>
				Phiên bản tiếng Việt của learn.svelte.dev
			</p>
			<div class="w-fit mx-auto fragment">
				<img src={learnImg} alt="screenshot of learn.sveltevietnam.dev" width="1024" height="768" class="h-[400px] w-auto">
			</div>
			<p class="fragment">
				Cảm ơn @sora42, @tymon3568, @duydang2311, @trongnguyen24
			</p>

			<aside class="notes">
				<p>Vừa rồi, cộng đồng ta đã hoàn thành việc dịch trang learn sang tiếng Việt. Learn là tài liệu chính thống từ team Svelte để hướng dẫn về Svelte và SvelteKit từ cơ bản đến nâng cao cho người mới bắt đầu</p>
				<p>__next__</p>
				<p>
					Đây là dự án xuất phát hoàn toàn từ cộng đồng, mình chỉ đóng vai trò quản trị và thiết lập môi trường. Cảm ơn các thành viên đã đóng góp vào dự án.
				</p>
				<p>__next__</p>
				<p>Trong đó đặc biệt sora đã đề xuất ban đầu cho dự án, và tymon là người dịch chính.</p>
			</aside>
		</section>

		<section class="slide" data-transition="fade">
			<p>...là gì, tại sao, như thế nào...</p>
			<aside class="notes">
				<p>
					Xem đến đây, có thể bạn có rất nhiều câu hỏi muốn được giải đáp, đặc biệt là nếu bạn chưa từng sử dụng hay nghe về Svelte.
				</p>
				<p>__next__</p>
				<p>
					Sự kiện ngày hôm nay hy vọng sẽ giúp làm rõ hơn nhưng thắc mắc của bạn. Tuy nhiên, một câu hỏi ta có thể giải đáp phần nào ngay bây giờ, ...
				</p>
				<p>__next__</p>
			</aside>
		</section>

		<section class="slide" data-transition="fade">
			<p>Bắt đầu từ đâu?</p>

			<aside class="notes">
				<p>... đó là "nếu muốn biết thêm về Svelte thì bắt đầu từ đâu?"</p>
			</aside>
		</section>

		<section class="slide" data-transition="fade">
			<p>Phần demo, xem tại video <a class="c-link" href="https://youtu.be/L109MSzC5nk">"Nhìn lại Svelte Việt Nam 2023 "</a></p>
		</section>

		<section class="slide" data-transition="fade">
			<h2>Svelte Việt Nam</h2>

			<div class="grid grid-cols-4 grid-rows-[auto,1fr] items-center gap-6">
				<p class="fragment grid grid-cols-[subgrid] grid-rows-[subgrid] row-span-2 place-items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
					<span class="self-start">mã nguồn mở</span>
				</p>
				<p class="fragment grid grid-cols-[subgrid] grid-rows-[subgrid] row-span-2 place-items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/><path d="M22 8c0-2.3-.8-4.3-2-6"/></svg>
					<span class="self-start">kênh thông tin</span>
				</p>
				<p class="fragment grid grid-cols-[subgrid] grid-rows-[subgrid] row-span-2 place-items-center">
					<img src="https://sveltesociety.dev/images/logo.svg" alt="svelte soceity" width="60" height="60" style=" width: 60px; max-width: none; height: 60px; max-height: none;margin-block: 0;">
					<span class="self-start">chapter của Svelte Society quốc tế</span>
				</p>
				<p class="fragment grid grid-cols-[subgrid] grid-rows-[subgrid] row-span-2 place-items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waypoints"><circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/></svg>
					<span class="self-start">cộng đồng cho người Việt quan tâm đến Svelte</span>
				</p>
			</div>

			<aside class="notes">
				<p>
				  Tổng kết lại những điều mình vừa trình bày, Svelte Việt Nam là một dự mã nguồn mở,
				</p>
				<p>__next__</p>
				<p>một kênh thông tin,</p>
				<p>__next__</p>
				<p>một chapter của Svelte Soceity,</p>
				<p>__next__</p>
				<p>và quan trọng hơn hết là cộng đồng cho người Việt quan tâm đến Svelte.</p>
				<p>Để hiểu thêm về Svelte Việt Nam, bạn có thể xem bài viết của mình tại đường dẫn sveltevietnam.dev/blog/what</p>
				<p>Nói cách khác...</p>
			</aside>
		</section>

		<section class="slide" data-transition="fade">
			<h2>
				<span>Svelte Việt Nam</span>
				<span>là</span>
				<span class="text-orange-500">bạn!</span>
			</h2>

			<aside class="notes">
				<p>...Svelte Việt Nam là chính bạn.</p>
				<p>
					Mình tạo ra dự án này với mục đích xây dưng cộng đồng theo mô hình tương đối mới, phi lợi nhuận, đề cao tinh thần chia sẻ và mã nguồn mở.
					Tuy nhiên nó có được đón nhận và thành công hay không là phụ thuộc vào cộng đồng, vào chính các bạn.
				</p>
			</aside>
		</section>

		<section class="slide">
			<h2>Tôi có thể làm gì?</h2>
			<ul>
				<li class="fragment">Tìm hiểu về hệ sinh thái Svelte (SvelteKit, Vite, Rollup, ...)</li>
				<li class="fragment">
					Chia sẻ:
					<ul>
						<li class="fragment">tham gia Discord,</li>
						<li class="fragment">viết bài,</li>
						<li class="fragment">xây dựng cộng đồng và sự kiện tại địa phương,</li>
						<li class="fragment">nói về Svelte tại nơi làm việc.</li>
					</ul>
				</li>
			</ul>

			<aside class="notes">
				<p>Vậy, bạn có thể làm gì để đóng góp vào cộng đồng Svelte Việt Nam?</p>
				<p>__next__</p>
				<p>Bạn có thể bắt đầu tìm hiểu và sử dụng Svelte,</p>
				<p>__next__</p>
				<p>chia sẻ,</p>
				<p>__next__</p>
				<p>thông qua discord,</p>
				<p>__next__</p>
				<p>viết về trải nghiệm và kiến thức tại blog của bạn hoặc Blog của Svelte Việt Nam,</p>
				<p>__next__</p>
				<p>Xây dựng và tổ chức các sự kiện cộng động tại chính nơi bạn đang sống,</p>
				<p>__next__</p>
				<p>và nói về Svelte tại nơi làm việc, thảo luận về những thứ hay và dở bạn học được từ quá trình sử dụng Svelte.</p>
			</aside>
		</section>

		<section>
			<h2>Xin cảm ơn</h2>
			<aside class="notes">
				<p>
					Cuối cùng, mình muốn nhấn mạnh rằng Svelte không phải là một công cụ vạn năng, cũng không phải là
					câu trả lời cho mọi vấn đề của bạn. Nhưng mình tin là Svelte sẽ mang lại cho bạn
					nhiều cơ hội mới, công việc mới, gặp gỡ nhiều người bạn mới trong những dự án và cộng đồng mới.
				</p>
				<p>Sự kiện hôm nay hy vọng là minh chứng cho những gì mình vừa nói.</p>
				<p>Chúc mọi người một buổi gặp mặt tốt đẹp và nhiều điều thú vị.</p>
				<p>Xin cảm ơn!</p>
			</aside>
		</section>
	</div>
</main>


<style lang="postcss">
	.stat-figure {
		transform: translateY(10px);
	}
</style>
