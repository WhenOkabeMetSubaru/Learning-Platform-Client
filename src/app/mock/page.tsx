'use client'
import useWindowDimensions from '@/components/customhooks/useDimensionHook'
import type { NextPage } from 'next'
import Image from 'next/image'


let demo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

const Home: NextPage = () => {

    let { height } = useWindowDimensions();


    return (
        <section className='min-h-screen relative font-sans'>

            <div className='h-12 z-10 bg-black flex items-center justify-end' >
                <div className='text-sm text-white px-5'>
                    <p>Question Paper</p>
                </div>
            </div>
            <section className='absolute bg-white flex top-[48px] left-0 right-0 bottom-0'>
                <div className='w-5/6 relative min-w-[800px] border-r border-gray-300'>


                    <div className='h-12 px-5 flex justify-between items-center bg-gray-100 w-full'>
                        <div className='w-28 h-7 rounded-sm flex justify-center bg-blue-500 text-white items-center'>
                            <p>Group 1</p>
                        </div>
                        <div className='w-9 rounded-sm flex text-white cursor-pointer justify-center items-center bg-blue-600 h-8'>
                            Y
                        </div>
                    </div>
                    {/* Timer bar */}
                    <div className='h-6 flex text-sm font-semibold justify-between px-5 items-center'>
                        <span>Section</span>
                        <span className='font-bold'>Time Left: 2 : 49 : 22</span>
                    </div>

                    {/* Sections Bar */}
                    <div className='h-9 text-[0.9rem] border-b-2 shadow-xs flex px-5 border font-semibold border-gray-300'>
                        <div className='flex border-l-2 text-[#36ace9] px-4 font-semibold justify-center items-center'>
                            <p>Quants</p>
                        </div>
                        <div className='flex border-l-2 bg-[#4e85c5] text-white px-4 font-semibold justify-center items-center'>
                            <p>DILR</p>
                        </div>
                        <div className='flex border-x-2 text-[#36ace9] border-gray-300 px-4 font-semibold justify-center items-center'>
                            <p>VARC</p>
                        </div>
                    </div>
                    <div className='h-9 px-5 border-b border-gray-300'>
                        <div className='text-orange-500 flex text-sm font-semibold pt-2'>Type: MCQ | Marks: <p className='text-green-800'>+3</p> -1</div>
                    </div>


                    <section className='overflow-hidden' >
                        <div className='flex border-[1.5px] border-gray-300 my-2.5 mx-2 overflow-hidden'>
                            <div style={{ height: height ? height - 270 : 480 }} className='w-3/5  dynamicheader px-3 pt-3 pb-16 text-[0.96rem] overflow-auto '>
                                <p>Implicit bias was once jargon that academic psychologists used to refer to people’s automatically activated thoughts and feelings toward certain groups rather than others. Now, it’s a buzzword that regularly appears in news articles and, occasionally, presidential debates. Implicit biases stand in contrast to explicit biases, people’s conscious or self-reported thoughts and feelings toward certain groups over others, such as when people overtly voice dislike toward Asian people. Implicit biases are more subtle. You can think of them as tiny stories that flicker in our minds when we see other people. A pharmacy employee might see a Black woman crouching on the floor and zipping up a bag, and immediately think she’s attempting to steal, as indeed happened in 2015 at a Shoppers Drug Mart in Toronto (which was later fined $8,000 for the discrimination). Or a border patrol officer might enforce an identity check upon Black citizens, thinking they pose a threat, as happened in the Netherlands in 2018; the Dutch appeal court this year ruled that unlawful.<br /></p><br />
                                <p>The concept of implicit bias has captivated social psychologists for decades because it answers a perennial question: why is it that, while most people espouse diversity, they still discriminate? And why is it that, though they say – and genuinely believe – they want equality, they behave in ways that favour some groups over others? Indeed, a research study with more than 600,000 participants demonstrated that, while white participants self-report relatively neutral explicit biases toward Black people, they still hold anti-Black implicit biases; another research study found that citizens of 34 countries implicitly associate men with science, more so than they do women. The assumption that drives implicit bias research, then, is that these biases, unchecked, can substantially influence thoughts and behaviours, even among well-meaning people. For instance, foreign-sounding names from minority job applicants’ résumés receive fewer call-backs for job interviews than equally qualified white counterparts; men dominate leadership positions in fields like medicine even when there is no shortage of women.<br /></p><br />
                                <p>So, implicit bias is a problem. What do most organisations do to solve it? Implicit bias training, sometimes known as ‘anti-bias training’ or ‘diversity training’, aims to reduce people’s implicit biases (how people think), and thereby presumably reduce discrimination (how people act). While the structure and content of these trainings can vary substantially, what typically happens is that, in one or two hours, an instructor provides attendees with a primer on implicit biases, explaining, for instance, the theory and evidence behind the concept; attendees then complete an Implicit Association Test (IAT), used to measure implicit biases, and reflect on their scores; and, finally, the instructor briefs attendees on ways to mitigate these biases (for instance, the National Institute of Health’s online implicit bias training module suggests employees ‘be transparent’ and ‘create a welcoming environment’. These trainings have become a burgeoning industry: McKinsey & Company estimated in 2017 that implicit bias training costs US companies $8 billion annually.<br /></p><br />
                                <p>Scores of criticisms around these tests already exist online, but I can give you my sense of why they’re so ineffectual. I completed an ‘unconscious bias training’ module as part of a work orientation from my alma mater. (Note: unconscious bias and implicit bias are not actually the same.) After spending about 30 minutes watching three modules of content that were supposed to last 90 minutes (I fast-forwarded most of the videos), and completing the quizzes after each module, I was left feeling the same way as I did after going through a workplace orientation module: bored, exasperated, like I had wasted my time on another check-box exercise or diversity-posturing activity.<br /></p><br />
                                <p>I’m also an implicit bias researcher, and here’s what the scientific literature says about these trainings: they largely don’t work. There are three main reasons why. First, the trainings conflate implicit biases with unconscious biases; this risks delegitimising discrimination altogether by attributing biased behaviour to the unconscious, which releases people from responsibility. Second, it’s very difficult to change people’s implicit biases, especially because social environments tend to reinforce them. And third, even if we could change people’s implicit biases, it wouldn’t necessarily change their discriminatory behaviours.<br /></p><br />
                                <p>Here’s where I land: while trainings, at best, can help raise awareness of inequality, they should not take precedence over more meaningful courses of action, such as policy changes, that are more time intensive and costly but provide lasting changes. If organisations want to effect meaningful societal changes on discrimination, they should shift our focus away from implicit biases and toward changing systems that perpetuate biased behaviour.<br /></p><br />
                                <p>To understand all of this, it’s important to know how the common measurement tool for implicit biases – the IAT – works. (My lab is devoted to improving these kinds of tools.) The easiest way to understand what the test entails is to do one: the standard version measuring racial biases is publicly available through the website Project Implicit, a domain that houses IATs for a variety of topics (race, gender, sexual orientation). Otherwise, here’s a quick rundown. The IAT flashes on your screen two kinds of stimuli: faces, either of Black people or white people, and words, either good words (‘smile’, ‘honest’, ‘sincere’) or bad words (‘disaster’, ‘agony’, ‘hatred’). In some trials, you’re then asked to press ‘E’ on your keyboard if either a Black face or bad word is shown, and ‘I’ on your keyboard if either a white face or good word is shown.<br /></p>
                                <p>But here’s where it gets tricky: what’s associated with each key mixes up as you progress. If in earlier trials ‘E’ means Black or bad, it can now mean Black or good (and ‘I’ white or bad). Let’s say that you’re now slower to press ‘E’ when it pairs Black with good than when it pairs Black with bad. That could suggest you hold more negative implicit biases toward Black people compared with white people because you’re slower to respond to Black when linked with good than with bad. (The ‘compared with’ is important here; the standard IAT evaluates one group relative to another.)<br /></p><br />
                                <p>At the end of the test, people receive their IAT test score, which tells them which group they have an ‘automatic preference’ for. This is the part that can incite shock or horror because, when people see that they hold an automatic preference toward white people, it might lead them to believe that, while they thought they preached equality, they were subconsciously biased the entire time.<br /></p><br />
                                <p>What some people get wrong, though, is that an automatic preference is not the same as an unconscious bias. Unconsciousness presumes an absence of awareness and thus conscious control. But an automatic preference doesn’t necessarily require either of those qualities. It’s like a habit, say nail-biting: you’ve associated stress with nail-biting so strongly that it doesn’t take long for stress to trigger you to bite your nails, but that doesn’t mean you’re not aware of it, that you can’t predict when it happens, or that you can’t, with effort, stop it when it happens.<br /></p>

                            </div>
                            <div className='w-2/5 overflow-auto min-h-[400px] max-h-[500px] px-1'>
                                <p className='text-[0.9rem] pl-1 font-semibold'>Question No.1</p>
                                <div className='h-[1.5px] bg-gray-300 my-1' />
                                <div className='mt-5 text-[0.9rem] px-2.5'>
                                    <p >What is the percentage increase in investment of B,C,D and E from year 1 to year 3?</p>
                                    <div className='mt-4 px-2.5'>
                                        <form>
                                            <fieldset>

                                                <div className='flex flex-col gap-y-6 items-start'>
                                                    <div className='flex gap-x-3 '>
                                                        <input
                                                            type="radio"
                                                            id="contactChoice1"
                                                            name="contact"
                                                            value="email" />
                                                        <p>The author agrees  with olbart with  the kind of development happening in the country.</p>
                                                    </div>
                                                    <div className='flex gap-x-3 '>
                                                        <input
                                                            type="radio"
                                                            id="contactChoice1"
                                                            name="contact"
                                                            value="email" />
                                                        <p>The author agrees  with olbart with  the kind of development happening in the country.</p>
                                                    </div>
                                                    <div className='flex gap-x-3 '>
                                                        <input
                                                            type="radio"
                                                            id="contactChoice1"
                                                            name="contact"
                                                            value="email" />
                                                        <p>The author agrees  with olbart with  the kind of development happening in the country.
                                                            The author agrees  with olbart with  the kind of development happening in the country.

                                                        </p>
                                                    </div>
                                                    <div className='flex gap-x-3 '>
                                                        <input
                                                            type="radio"
                                                            id="contactChoice1"
                                                            name="contact"
                                                            value="email" />
                                                        <p>The author agrees  with olbart with  the kind of development happening in the country.</p>
                                                    </div>
                                                    <div className='flex gap-x-3 '>
                                                        <input
                                                            type="radio"
                                                            id="contactChoice1"
                                                            name="contact"
                                                            value="email" />
                                                        <p>The author agrees  with olbart with  the kind of development happening in the country.</p>
                                                    </div>

                                                </div>

                                            </fieldset>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <div className='absolute border-t border-gray-300 flex justify-between items-center right-0 left-0 bottom-0 h-12 px-3'>
                        <div className='flex gap-x-1'>
                            <button className='flex justify-center text-[1.05rem] border-gray-400 border items-center w-56 bg-gray-200 h-9 rounded-sm'>
                                <p>Mark For Review & Next</p>
                            </button>
                            <button className='flex justify-center border-gray-400 border items-center w-40 bg-gray-200 h-9 rounded-sm'>
                                <p>Clear Response</p>
                            </button>
                        </div>
                        <button className='flex justify-center border-gray-400 text-white border items-center w-36 bg-blue-600 h-9 rounded-sm'>
                            <p>Save & Next</p>
                        </button>
                    </div>


                </div>
                <div className='w-1/6 '>
                    <div className='h-[108px] border-y border-r px-1 flex gap-x-2 border-gray-300'>
                        <Image src="/images/defaultAvatar.jfif" height={85} width={85} alt='user-avatar' className='shadow mt-1 bg-red-200' />

                        <p className='font-semibold text-[0.9rem] mt-1'>Bunsukh Fandgudu</p>
                    </div>
                    <div className='h-[8.2rem] border-l-[2px] border-black border-t-[2px]'>
                        <div className='grid grid-cols-2 gap-y-2.5 px-2 mt-2'>
                            <div className='flex gap-x-2 '>
                                <div className='w-8 h-8 bg-green-400 flex justify-center items-center text-[0.8rem] font-semibold border-green-500 border-[1.5px] rounded-sm text-white'>
                                    <p>0</p>
                                </div>
                                <p className='text-[0.72rem]'>Answered</p>
                            </div>
                            <div className='flex gap-x-2 '>
                                <div className='w-8 h-8 bg-red-500 flex justify-center items-center text-[0.8rem] font-semibold border-red-500 border-[1.5px] rounded-sm text-white'>
                                    <p>0</p>
                                </div>
                                <p className='text-[0.72rem]'>Not Answered</p>
                            </div>



                            <div className='flex gap-x-2 '>
                                <div className='w-8 h-7 bg-gray-300 flex justify-center items-center text-[0.8rem] text-black font-semibold border-gray-500 border-[1.5px] rounded-md'>
                                    <p>0</p>
                                </div>
                                <p className='text-[0.72rem]'>Not Visited</p>
                            </div>
                            <div className='flex gap-x-2 '>
                                <div className='w-8 h-8 bg-purple-500 flex justify-center items-center text-[0.8rem] font-semibold border-purple-500 border-[1.5px] rounded-full text-white'>
                                    <p>0</p>
                                </div>
                                <p className='text-[0.72rem]'>Marked For Review</p>
                            </div>

                        </div>
                        <div className='flex gap-x-2 px-2 mt-2'>
                            <div className='w-8 h-8 bg-purple-500 flex justify-center items-center text-[0.8rem] font-semibold border-purple-500 border-[1.5px] rounded-full text-white'>
                                <p>0</p>
                            </div>
                            <p className='text-[0.72rem]'>Answered & Marked For Review</p>
                        </div>
                    </div>
                    <div className='relative ' >
                        <div className='border-l-[2px] border-black bg-blue-500 h-8 text-white'>
                            <p className='px-2 font-bold text-[0.9rem] pt-1'>Quantitative Aptitude</p>
                        </div>
                        <div className='bg-blue-100 border-l-[2px] border-b-[2px] border-black'>
                            <p className='text-[0.85rem] font-semibold py-1 px-2'>Choose a Question</p>
                            <div style={{ height: height ? height - 415 : 320 }} className='  grid grid-cols-4 gap-2.5 items-start justify-start  px-2.5 py-2.5 text-[0.9rem] overflow-auto '>

                                {
                                    demo?.map((item) => {
                                        return (
                                            <div key={item} className='flex text-[1.15rem] justify-center items-center h-[2.8rem] w-[2.90rem] bg-gradient-to-b from-gray-50 via-gray-200 to-gray-300 rounded-sm border border-gray-500'>
                                                <p>{item}</p>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>

                        <div className='h-16 bg-blue-100 flex justify-center items-center'>
                            <button className='flex justify-center items-center w-20 h-[2.2rem] bg-blue-500 text-white rounded-sm shadow-sm'>
                                <p>Submit</p>
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </section>
    )
}

export default Home
