import FlexChild from "@/components/flex/FlexChild";
import VerticalFlex from "@/components/flex/VerticalFlex";
import P from "@/components/P/P";
import { useAuth } from "@/providers/AuthPorivder/AuthPorivder";
import { requester } from "@/shared/Requester";
import { SearchParams } from "next/dist/server/request/search-params";
import { redirect } from "next/navigation";
import { SignUp } from "./client";

export default async function ({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const { userData } = await useAuth()
    if (userData) redirect('/');
    const { email, code } = await searchParams;
    if (!email || !code) {
        redirect(`/login`);
    }
    if (email && code) {
        const { exist, error } = await requester.isLink({ email, code })
        if (!exist) {
            redirect(`/login?error=${encodeURIComponent(error)}`);
        }

    }
    return <VerticalFlex height={'100vh'} width={320} margin={'auto'} justifyContent="center" >
        <FlexChild paddingBottom={40}>
            <P fontWeight={600} fontSize={22}>프로필 만들기</P>
        </FlexChild>
        <FlexChild>
            <SignUp email={email as string} code={code as string} />
        </FlexChild>



    </VerticalFlex>
}

