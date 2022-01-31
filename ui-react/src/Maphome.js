import React from "react";
import { Typography, Box, CssBaseline, Container } from '@material-ui/core';
import map from "./radar.gif"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom'
import Header from "./Header";

const theme = createTheme();

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <Link to='/plotresults' style={{ textDecoration: 'none', color: "black" }}>
                    <ListItemText primary={`Item ${index + 1}`} />
                </Link>
            </ListItemButton>
        </ListItem>
    );
}

const Maphome = () => {
    return (
        <>
            <main>
                <Header />
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="md" >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: 4,
                            }}
                        >
                            <Typography variant="h5" align="center" color="textPrimary" gutterBottom >
                                Please select a Station by Clicking on the Map
                            </Typography>

                            <map name="dopplers">
                                <area shape="CIRCLE" coords="34,52,10" href="datetimefilter?id=paec" alt="PAEC - Nome, AK" />
                                <area shape="CIRCLE" coords="34,83,9" href="datetimefilter?id=pabc" alt="PABC - Bethel, AK" />
                                <area shape="CIRCLE" coords="57,98,8" href="datetimefilter?id=pakc" alt="PAKC - King Salmon" />
                                <area shape="CIRCLE" coords="69,83,9" href="datetimefilter?id=pahg" alt="PAHG - Kenai, AK" />
                                <area shape="CIRCLE" coords="93,85,9" href="datetimefilter?id=paih" alt="PAIH - Middleton Is., AK" />
                                <area shape="CIRCLE" coords="137,90,9" href="datetimefilter?id=pacg" alt="PACG - Biorka Is., AK" />
                                <area shape="CIRCLE" coords="74,47,9" href="datetimefilter?id=papd" alt="PAPD - Pedro Dome, AK" />
                                <area shape="RECT" coords="0,455,41,491" href="datetimefilter?id=pgua" alt="PGUA - Anderson AFB, Guam" />
                                <area shape="POLY" coords="554,454,511,454,478,478,478,490,553,491,554,454,554,454" href="datetimefilter?id=tjua" alt="TJUA - Puerto Rico/Virgin Islands" />
                                <area shape="CIRCLE" coords="60,143,10" href="datetimefilter?id=katx" alt="KATX - Seattle/Tacoma, WA" />
                                <area shape="CIRCLE" coords="95,155,10" href="datetimefilter?id=kotx" alt="KOTX - Spokane, WA" />
                                <area shape="CIRCLE" coords="88,183,10" href="datetimefilter?id=kpdt" alt="KPDT - Pendleton, OR" />
                                <area shape="CIRCLE" coords="42,172,10" href="datetimefilter?id=krtx" alt="KRTX - Portland, OR" />
                                <area shape="CIRCLE" coords="33,212,10" href="datetimefilter?id=kmax" alt="KMAX - Medford, OR" />
                                <area shape="CIRCLE" coords="17,230,10" href="datetimefilter?id=kbhx" alt="KBHX - Eureka, CA" />
                                <area shape="CIRCLE" coords="33,247,8" href="datetimefilter?id=kbbx" alt="KBBX - Beal AFB, CA" />
                                <area shape="CIRCLE" coords="34,262,8" href="datetimefilter?id=kdax" alt="KDAX - Sacramento, CA" />
                                <area shape="CIRCLE" coords="27,280,10" href="datetimefilter?id=kmux" alt="KMUX - San Francisco Bay Area, CA" />
                                <area shape="CIRCLE" coords="52,260,8" href="datetimefilter?id=krgx" alt="KRGX - Reno, NV" />
                                <area shape="CIRCLE" coords="87,251,10" href="datetimefilter?id=klrx" alt="KLRX - Elko, NV" />
                                <area shape="CIRCLE" coords="98,216,10" href="datetimefilter?id=kcbx" alt="KCBX - Boise, ID" />
                                <area shape="CIRCLE" coords="122,176,10" href="datetimefilter?id=kmsx" alt="KMSX - Missoula, MT" />
                                <area shape="CIRCLE" coords="143,173,10" href="datetimefilter?id=ktfx" alt="KTFX - Great Falls, MT" />
                                <area shape="CIRCLE" coords="131,226,10" href="datetimefilter?id=ksfx" alt="KSFX - Pocatello/Idaho Falls, ID" />
                                <area shape="CIRCLE" coords="128,251,10" href="datetimefilter?id=kmtx" alt="KMTX - Salt Lake City, UT" />
                                <area shape="CIRCLE" coords="113,290,9" href="datetimefilter?id=kicx" alt="KICX - Cedar City, UT" />
                                <area shape="CIRCLE" coords="87,309,9" href="datetimefilter?id=kesx" alt="KESX - Las Vegas, NV" />
                                <area shape="CIRCLE" coords="58,315,10" href="datetimefilter?id=keyx" alt="KEYX - Edwards AFB, CA" />
                                <area shape="CIRCLE" coords="44,296,9" href="datetimefilter?id=khnx" alt="KHNX - San Joaquin Valley, CA" />
                                <area shape="CIRCLE" coords="29,314,8" href="datetimefilter?id=kvbx" alt="KVBX - Vandenberg AFB, CA" />
                                <area shape="CIRCLE" coords="40,323,8" href="datetimefilter?id=kvtx" alt="KVTX - Los Angeles, CA" />
                                <area shape="CIRCLE" coords="55,334,7" href="datetimefilter?id=ksox" alt="KSOX - Santa Ana Mtns, CA" />
                                <area shape="CIRCLE" coords="60,348,9" href="datetimefilter?id=knkx" alt="KNKX - San Diego, CA" />
                                <area shape="CIRCLE" coords="64,438,8" href="datetimefilter?id=phwa" alt="PHWA - South Shore, HI" />
                                <area shape="CIRCLE" coords="59,419,8" href="datetimefilter?id=phkm" alt="PHKM - Kohala, HI" />
                                <area shape="CIRCLE" coords="40,413,9" href="datetimefilter?id=phmo" alt="PHMO - Molokai, HI" />
                                <area shape="CIRCLE" coords="18,404,9" href="datetimefilter?id=phki" alt="PHKI - Kauai, HI" />
                                <area shape="CIRCLE" coords="85,356,9" href="datetimefilter?id=kyux" alt="KYUX - Yuma, AZ" />
                                <area shape="CIRCLE" coords="122,366,10" href="datetimefilter?id=kemx" alt="KEMX - Tucson, AZ" />
                                <area shape="CIRCLE" coords="114,347,10" href="datetimefilter?id=kiwa" alt="KIWA - Phoenix, AZ" />
                                <area shape="CIRCLE" coords="120,323,10" href="datetimefilter?id=kfsx" alt="KFSX - Flagstaff, AZ" />
                                <area shape="CIRCLE" coords="161,286,11" href="datetimefilter?id=kgjx" alt="KGJX - Grand Junction, CO" />
                                <area shape="CIRCLE" coords="165,234,9" href="datetimefilter?id=kriw" alt="KRIW - Riverton, WY" />
                                <area shape="CIRCLE" coords="171,199,10" href="datetimefilter?id=kblx" alt="KBLX - Billings, MT" />
                                <area shape="CIRCLE" coords="194,171,10" href="datetimefilter?id=kggw" alt="KGGW - Glasgow, MT" />
                                <area shape="CIRCLE" coords="235,169,10" href="datetimefilter?id=kmbx" alt="KMBX - Minot AFB, ND" />
                                <area shape="CIRCLE" coords="241,190,10" href="datetimefilter?id=kbis" alt="KBIS - Bismark, ND" />
                                <area shape="CIRCLE" coords="253,210,9" href="datetimefilter?id=kabr" alt="KABR - Aberdeen, SD" />
                                <area shape="CIRCLE" coords="268,180,10" href="datetimefilter?id=kmvx" alt="KMVX - Fargo, ND" />
                                <area shape="CIRCLE" coords="220,226,10" href="datetimefilter?id=kudx" alt="KUDX - Rapid City, SD" />
                                <area shape="CIRCLE" coords="271,229,10" href="datetimefilter?id=kfsd" alt="KFSD - Sioux falls, SD" />
                                <area shape="CIRCLE" coords="304,220,9" href="datetimefilter?id=kmpx" alt="KMPX - Minneapolis, MN" />
                                <area shape="CIRCLE" coords="313,192,11" href="datetimefilter?id=kdlh" alt="KDLH - Duluth, MN" />
                                <area shape="CIRCLE" coords="352,192,11" href="datetimefilter?id=kmqt" alt="KMQT - Marquette, MI" />
                                <area shape="CIRCLE" coords="354,215,10" href="datetimefilter?id=kgrb" alt="KGRB - Green Bay, WI" />
                                <area shape="CIRCLE" coords="328,228,11" href="datetimefilter?id=karx" alt="KARX - La Crosse, WI" />
                                <area shape="CIRCLE" coords="302,252,10" href="datetimefilter?id=kdmx" alt="KDMX - Des Moines, IA" />
                                <area shape="CIRCLE" coords="277,259,10" href="datetimefilter?id=koax" alt="KOAX - Omaha, NE" />
                                <area shape="CIRCLE" coords="259,272,10" href="datetimefilter?id=kuex" alt="KUEX - Grand Island, NE" />
                                <area shape="CIRCLE" coords="233,258,10" href="datetimefilter?id=klnx" alt="KLNX - North Platte, NE" />
                                <area shape="CIRCLE" coords="193,258,10" href="datetimefilter?id=kcys" alt="KCYS - Cheyenne, WY" />
                                <area shape="CIRCLE" coords="193,282,11" href="datetimefilter?id=kftg" alt="KFTG - Denver/Boulder, CO" />
                                <area shape="CIRCLE" coords="193,301,10" href="datetimefilter?id=kpux" alt="KPUX - Pueblo, CO" />
                                <area shape="CIRCLE" coords="172,331,11" href="datetimefilter?id=kabx" alt="KABX - Albuquerque, NM" />
                                <area shape="CIRCLE" coords="176,358,9" href="datetimefilter?id=khdx" alt="KHDX - Holloman AFB, NM" />
                                <area shape="CIRCLE" coords="168,378,11" href="datetimefilter?id=kepz" alt="KEPZ - El Paso, TX" />
                                <area shape="CIRCLE" coords="201,346,9" href="datetimefilter?id=kfdx" alt="KFDX - Cannon AFB, NM" />
                                <area shape="CIRCLE" coords="224,335,10" href="datetimefilter?id=kama" alt="KAMA - Amarillo, TX" />
                                <area shape="CIRCLE" coords="222,357,9" href="datetimefilter?id=klbb" alt="KLBB - Lubbock, TX" />
                                <area shape="CIRCLE" coords="215,382,10" href="datetimefilter?id=kmaf" alt="KMAF - Midland/Odessa, TX" />
                                <area shape="CIRCLE" coords="236,388,10" href="datetimefilter?id=ksjt" alt="KSJT - San Angelo, TX" />
                                <area shape="CIRCLE" coords="248,370,10" href="datetimefilter?id=kdyx" alt="KDYX - Dyess AFB, TX" />
                                <area shape="CIRCLE" coords="272,371,10" href="datetimefilter?id=kfws" alt="KFWS - Dallas/Fort Worth, TX" />
                                <area shape="CIRCLE" coords="272,390,10" href="datetimefilter?id=kgrk" alt="KGRK - Central Texas" />
                                <area shape="CIRCLE" coords="258,406,10" href="datetimefilter?id=kewx" alt="KEWX - Austin/San Antonio, TX" />
                                <area shape="CIRCLE" coords="233,422,11" href="datetimefilter?id=kdfx" alt="KDFX - Laughlin AFB, TX" />
                                <area shape="CIRCLE" coords="268,428,10" href="datetimefilter?id=kcrp" alt="KCRP - Corpus Christi, TX" />
                                <area shape="CIRCLE" coords="262,455,10" href="datetimefilter?id=kbro" alt="KBRO - Brownsville, TX" />
                                <area shape="CIRCLE" coords="291,415,11" href="datetimefilter?id=khgx" alt="KHGX - Houston/Galveston, TX" />
                                <area shape="CIRCLE" coords="312,407,9" href="datetimefilter?id=klch" alt="KLCH - Lake Charles, LA" />
                                <area shape="CIRCLE" coords="312,390,9" href="datetimefilter?id=kpoe" alt="KPOE - Fort Polk, LA" />
                                <area shape="CIRCLE" coords="307,376,9" href="datetimefilter?id=kshv" alt="KSHV - Shreveport, LA" />
                                <area shape="CIRCLE" coords="248,347,9" href="datetimefilter?id=kfdr" alt="KFDR - Frederick, OK" />
                                <area shape="CIRCLE" coords="270,338,9" href="datetimefilter?id=ktlx" alt="KTLX - Oklahoma City, OK" />
                                <area shape="CIRCLE" coords="282,326,8" href="datetimefilter?id=kinx" alt="KINX - Tulsa, OK" />
                                <area shape="CIRCLE" coords="262,322,8" href="datetimefilter?id=kvnx" alt="KVNX - Vance AFB, OK" />
                                <area shape="CIRCLE" coords="237,310,9" href="datetimefilter?id=kddc" alt="KDDC - Dodge City, KS" />
                                <area shape="CIRCLE" coords="231,286,10" href="datetimefilter?id=kgld" alt="KGLD - Goodland, KS" />
                                <area shape="CIRCLE" coords="273,309,10" href="datetimefilter?id=kict" alt="KICT - Wichita, KS" />
                                <area shape="CIRCLE" coords="283,294,9" href="datetimefilter?id=ktwx" alt="KTWX - Topeka, KS" />
                                <area shape="CIRCLE" coords="300,290,10" href="datetimefilter?id=keax" alt="KEAX - Kansas City/Pleasant Hill, MO" />
                                <area shape="CIRCLE" coords="312,314,11" href="datetimefilter?id=ksgf" alt="KSGF - Springfield, MO" />
                                <area shape="CIRCLE" coords="300,336,10" href="datetimefilter?id=ksrx" alt="KSRX - Western Arkansas/Ft. Smith, AR" />
                                <area shape="CIRCLE" coords="319,346,10" href="datetimefilter?id=klzk" alt="KLZK - Little Rock, AR" />
                                <area shape="CIRCLE" coords="330,257,8" href="datetimefilter?id=kdvn" alt="KDVN - Quad Cities, IA" />
                                <area shape="CIRCLE" coords="355,252,8" href="datetimefilter?id=klot" alt="KLOT - Chicago, IL" />
                                <area shape="CIRCLE" coords="375,233,9" href="datetimefilter?id=kgrr" alt="KGRR - Grand Rapids/Muskegon, MI" />
                                <area shape="CIRCLE" coords="383,212,9" href="datetimefilter?id=kapx" alt="KAPX - Gaylord, MI" />
                                <area shape="CIRCLE" coords="398,241,9" href="datetimefilter?id=kdtx" alt="KDTX - Detroit, MI" />
                                <area shape="CIRCLE" coords="414,251,9" href="datetimefilter?id=kcle" alt="KCLE - Cleveland, OH" />
                                <area shape="CIRCLE" coords="436,257,10" href="datetimefilter?id=kpbz" alt="KPBZ - Pittsburgh, PA" />
                                <area shape="CIRCLE" coords="458,249,8" href="datetimefilter?id=kccx" alt="KCCX - State College, PA" />
                                <area shape="CIRCLE" coords="442,226,10" href="datetimefilter?id=kbuf" alt="KBUF - Buffalo, NY" />
                                <area shape="CIRCLE" coords="466,230,8" href="datetimefilter?id=kbgm" alt="KBGM - Binghamton, NY" />
                                <area shape="CIRCLE" coords="464,209,8" href="datetimefilter?id=ktyx" alt="KTYX - Montague, NY" />
                                <area shape="CIRCLE" coords="485,219,9" href="datetimefilter?id=kenx" alt="KENX - Albany, NY" />
                                <area shape="CIRCLE" coords="488,195,9" href="datetimefilter?id=kcxx" alt="KCXX - Burlington, VT" />
                                <area shape="CIRCLE" coords="517,194,9" href="datetimefilter?id=kgyx" alt="KGYX - Portland, ME" />
                                <area shape="CIRCLE" coords="527,162,8" href="datetimefilter?id=kcbw" alt="KCBW - Caribou, ME" />
                                <area shape="CIRCLE" coords="513,219,9" href="datetimefilter?id=kbox" alt="KBOX - Boston, MA" />
                                <area shape="CIRCLE" coords="498,242,10" href="datetimefilter?id=kokx" alt="KOKX - Upton, NY" />
                                <area shape="CIRCLE" coords="487,259,10" href="datetimefilter?id=kdix" alt="KDIX - Philadelphia, PA" />
                                <area shape="CIRCLE" coords="483,279,9" href="datetimefilter?id=kdox" alt="KDOX - Dover AFB, DE" />
                                <area shape="CIRCLE" coords="463,278,10" href="datetimefilter?id=klwx" alt="KLWX - Sterling, VA" />
                                <area shape="CIRCLE" coords="379,257,9" href="datetimefilter?id=kiwx" alt="KIWX - Northern Indiana, IN" />
                                <area shape="CIRCLE" coords="378,274,9" href="datetimefilter?id=kind" alt="KIND - Indianapolis, IN" />
                                <area shape="CIRCLE" coords="345,272,9" href="datetimefilter?id=kilx" alt="KILX - Central Illinois, IL" />
                                <area shape="CIRCLE" coords="332,292,10" href="datetimefilter?id=klsx" alt="KLSX - St. Louis, MO" />
                                <area shape="CIRCLE" coords="352,305,10" href="datetimefilter?id=kpah" alt="KPAH - Paducah, KY" />
                                <area shape="CIRCLE" coords="383,299,8" href="datetimefilter?id=klvx" alt="KLVX - Louisville, KY" />
                                <area shape="CIRCLE" coords="368,315,6" href="datetimefilter?id=khpx" alt="KHPX - Fort Campbell, KY" />
                                <area shape="CIRCLE" coords="376,324,8" href="datetimefilter?id=kohx" alt="KOHX - Nashville, TN" />
                                <area shape="CIRCLE" coords="386,340,9" href="datetimefilter?id=khtx" alt="KHTX - Northern Alabama" />
                                <area shape="CIRCLE" coords="345,337,9" href="datetimefilter?id=knqa" alt="KNQA - Memphis, TN" />
                                <area shape="CIRCLE" coords="361,353,8" href="datetimefilter?id=kgwx" alt="KGWX - Columbus AFB, MS" />
                                <area shape="CIRCLE" coords="346,373,8" href="datetimefilter?id=kdgx" alt="KJAN - Brandon/Jackson, MS" />
                                <area shape="CIRCLE" coords="343,407,11" href="datetimefilter?id=klix" alt="KLIX - New Orleans/Baton Rouge, LA" />
                                <area shape="CIRCLE" coords="369,396,9" href="datetimefilter?id=kmob" alt="KMOB - Mobile, AL" />
                                <area shape="CIRCLE" coords="387,396,8" href="datetimefilter?id=kevx" alt="KEVX - Northwest Florida" />
                                <area shape="CIRCLE" coords="395,382,8" href="datetimefilter?id=keox" alt="KEOX - Fort Rucker, AL" />
                                <area shape="CIRCLE" coords="391,369,6" href="datetimefilter?id=kmxx" alt="KMXX - East Alabama" />
                                <area shape="CIRCLE" coords="379,360,6" href="datetimefilter?id=kbmx" alt="KBMX - Birmingham, AL" />
                                <area shape="CIRCLE" coords="402,348,9" href="datetimefilter?id=kffc" alt="KFFC - Atlanta, GA" />
                                <area shape="CIRCLE" coords="420,360,8" href="datetimefilter?id=kjgx" alt="KJGX - Robins AFB, GA" />
                                <area shape="CIRCLE" coords="421,382,10" href="datetimefilter?id=kvax" alt="KVAX - Moody AFB, GA" />
                                <area shape="CIRCLE" coords="410,397,8" href="datetimefilter?id=ktlh" alt="KTLH - Tallahassee, FL" />
                                <area shape="CIRCLE" coords="436,426,8" href="datetimefilter?id=ktbw" alt="KTBW - Tampa Bay Area, FL" />
                                <area shape="CIRCLE" coords="443,462,9" href="datetimefilter?id=kbyx" alt="KBYX - Key West, FL" />
                                <area shape="CIRCLE" coords="462,446,9" href="datetimefilter?id=kamx" alt="KAMX - Miami, FL" />
                                <area shape="CIRCLE" coords="454,419,9" href="datetimefilter?id=kmlb" alt="KMLB - Melbourne, FL" />
                                <area shape="CIRCLE" coords="441,392,10" href="datetimefilter?id=kjax" alt="KJAX - Jacksonville, FL" />
                                <area shape="CIRCLE" coords="445,360,9" href="datetimefilter?id=kclx" alt="KCLX - Charleston, SC" />
                                <area shape="CIRCLE" coords="438,343,9" href="datetimefilter?id=kcae" alt="KCAE - Columbia, SC" />
                                <area shape="CIRCLE" coords="424,333,9" href="datetimefilter?id=kgsp" alt="KGSP - Greer, SC" />
                                <area shape="CIRCLE" coords="405,322,11" href="datetimefilter?id=kmrx" alt="KMRX - Knoxville/Tri Cities, TN" />
                                <area shape="CIRCLE" coords="405,301,9" href="datetimefilter?id=kjkl" alt="KJKL - Jackson, KY" />
                                <area shape="CIRCLE" coords="403,276,9" href="datetimefilter?id=kiln" alt="KILN - Wilmington, OH" />
                                <area shape="CIRCLE" coords="425,290,9" href="datetimefilter?id=krlx" alt="KRLX - Charleston, WV" />
                                <area shape="CIRCLE" coords="440,301,10" href="datetimefilter?id=kfcx" alt="KFCX - Blacksburg, VA" />
                                <area shape="CIRCLE" coords="457,315,10" href="datetimefilter?id=krax" alt="KRAX - Raleigh/Durham, NC" />
                                <area shape="CIRCLE" coords="479,297,11" href="datetimefilter?id=kakq" alt="KAKQ - Wakefield, VA" />
                                <area shape="CIRCLE" coords="481,325,10" href="datetimefilter?id=kmhx" alt="KMHX - Morehead City, NC" />
                                <area shape="CIRCLE" coords="466,342,10" href="datetimefilter?id=kltx" alt="KLTX - Wilmington, NC" />
                                <area shape="CIRCLE" coords="352,238,8" href="datetimefilter?id=kmkx" alt="KMKX - Milwaukee, WI" />
                                <area shape="CIRCLE" coords="367,300,7" href="datetimefilter?id=kvwx" alt="KVWX - Evansville, IN" />
                                <area shape="CIRCLE" coords="137,441,10" href="datetimefilter?id=rkjk" alt="RKJK - Kunsan, RO" />
                                <area shape="CIRCLE" coords="134,430,10" href="datetimefilter?id=rksg" alt="RKSG - Camp Humphreys, RO" />
                                <area shape="CIRCLE" coords="44,152,10" href="datetimefilter?id=klgx" alt="KLGX - Langley Hill, WA" />
                            </map>

                            <img src={map} width="554" height="491" border="0" alt="National Doppler Radar Sites" useMap="#dopplers" ></img>

                            <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                                Recent Searches
                            </Typography>
                            <Box
                                sx={{ width: '100%', height: 500, maxWidth: 750, bgcolor: 'background.paper', boxShadow: 4 }}
                            >
                                <FixedSizeList
                                    height={500}
                                    width={750}
                                    itemSize={46}
                                    itemCount={20}
                                    overscanCount={5}
                                >
                                    {renderRow}
                                </FixedSizeList>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>

            </main>
        </>
    );
}

export default Maphome;