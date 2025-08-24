import FlexChild from "@/components/flex/FlexChild";
import VerticalFlex from "@/components/flex/VerticalFlex";
import P from "@/components/P/P";
import { useAuth } from "@/providers/AuthPorivder/AuthPorivder";
import { SearchParams } from "next/dist/server/request/search-params";
import { redirect } from "next/navigation";
import { Login, Social } from "./client";

export default async function ({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const { userData } = await useAuth()
    if (!!userData) { redirect('/'); }
    const { email, code, error, state } = await searchParams;
    if (email && code) {
        redirect(`/signup?email=${email}&code=${code}`)
    }
    return <VerticalFlex height={'100vh'} width={320} margin={'auto'} justifyContent="center" >
        <FlexChild paddingBottom={40}>
            <P fontWeight={600} fontSize={22}>협업용 프로젝트 로그인</P>
        </FlexChild>
        <FlexChild>
            <Social />
        </FlexChild>
        <FlexChild height={1} borderBottom={'1px solid rgba(84, 72, 49, 0.15)'} padding={10} marginBottom={20} />
        <FlexChild>
            <Login error={error as string} code={code as string} state={state as string} />
        </FlexChild>
        <FlexChild padding={30}>
            <P size={12}>계속 진행하면 이용약관및 개인정보처리방침을 이해하고 동의하는 것으로 간주됩니다.</P>
        </FlexChild>
    </VerticalFlex>
}

