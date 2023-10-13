import React, {useEffect, useState} from 'react';
import '../BodyInfo.css'
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import CustomNavLink from "./customNavLink.jsx";

const bodyParts = ['leftCalf', 'rightCalf', 'leftThigh', 'rightThigh', 'hips', 'waist', 'chest', 'neck', 'shoulders', 'leftForearm', 'rightForearm', 'leftArm', 'rightArm'];


function BodyInfo({refresh}) {
    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getBodyPartInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/body/?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setData(response.data[0].bodyParameters);
                }
            } catch (e) {
                console.log(e);
                setData([]);
            }
        }
        getBodyPartInfo();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [refresh]);

    return (<>
        <div>
            {/*<svg version="1.1" id="Map" className="gen-by-synoptic-designer" xmlns="http://www.w3.org/2000/svg"*/}
            {/*     xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 578 538" xml:space="preserve">ł<polygon*/}
            {/*    id="Left_Pec_Mayoris" title="" points="144,116,142,149,159,156,183,150,190,130,169,116"/>*/}
            {/*    <polygon id="Right_Pec_Mayoris" title="" points="90,128,94,150,117,156,135,149,134,117,109,117"/>*/}
            {/*    <polygon id="Left_Rectus_Abdominis" title=""*/}
            {/*             points="155,159,159,171,160,205,160,241,155,255,152,269,143,278,142,221,141,179,142,154"/>*/}
            {/*    <polygon id="Left_Oblique" title=""*/}
            {/*             points="185,169,182,154,161,160,164,171,165,218,178,207,180,185,182"/>*/}
            {/*    <polygon id="Right_Oblique" title="" points="100,206,98,190,93,169,96,154,117,159,113,169,113,219"/>*/}
            {/*    <polygon id="Right_Biceps_Brachii_Long_Head" title=""*/}
            {/*             points="58,181,61,189,73,176,88,146,85,135,67,151"/>*/}
            {/*    <polygon id="Left_Neck" title="" points="153,72,141,96,141,110,168,112,190,124,187,104,172,100,160,89"/>*/}
            {/*    <polygon id="Right_Neck" title="" points="88,124,91,105,106,100,118,88,126,74,137,97,136,110,110,111"/>*/}
            {/*    <polygon id="Left_Deltoids_Front" title=""*/}
            {/*             points="209,144,212,131,211,115,203,107,191,103,194,119,192,130"/>*/}
            {/*    <polygon id="Right_Deltoids_Front" title="" points="86,130,69,144,66,131,67,114,77,105,87,105,83,120"/>*/}
            {/*    <polygon id="Head_Front" title=""*/}
            {/*             points="121,21,115,43,120,62,130,71,139,76,151,69,158,61,162,39,157,20,139,14"/>*/}
            {/*    <polygon id="GROINS" title="" points="146,284,150,320,164,284,169,259,176,245,164,241,156,270"/>*/}
            {/*    <polygon id="GROINS" title=""*/}
            {/*             points="134,285,127,321,120,298,116,291,114,277,110,265,102,244,114,240,119,257,124,272"/>*/}
            {/*    <polygon id="QUADS" title=""*/}
            {/*             points="102,256,108,279,108,327,101,350,93,339,89,308,86,287,89,261,96,246"/>*/}
            {/*    <polygon id="QUADS" title="" points="112,331,111,289,118,304,126,331,122,345,115,372,106,373,104,357"/>*/}
            {/*    <polygon id="Right_Knee_Front" title=""*/}
            {/*             points="100,357,102,365,104,375,106,384,103,398,90,398,84,388,84,375,91,367"/>*/}
            {/*    <polygon id="Left_Tibialis_Anterior" title=""*/}
            {/*             points="192,407,197,390,205,409,212,425,209,474,212,493,200,493"/>*/}
            {/*    <polygon id="Left_Shin" title="" points="195,492,188,404,177,402,174,412,174,419,178,448"/>*/}
            {/*    <polygon id="Right_Shin" title=""*/}
            {/*             points="104,402,105,412,105,423,103,436,103,447,96,460,92,473,83,491,84,474,86,456,87,444,88,430,90,416,91,403"/>*/}
            {/*    <polygon id="Right_Tibialis_Anterior" title=""*/}
            {/*             points="78,491,85,418,86,407,81,392,78,400,72,410,68,425,71,475,68,493"/>*/}
            {/*    <polygon id="Right_Brachioradialis" title="" points="32,231,42,198,53,186,57,196,64,194,28,253,17,259"/>*/}
            {/*    <polygon id="QUADS" title="" points="97,353,82,371,80,349,80,326,83,294,89,341"/>*/}
            {/*    <polygon id="Left_Knee_Front" title="" points="178,357,194,376,194,387,188,399,176,398,171,384"/>*/}
            {/*    <polygon id="QUADS" title="" points="193,291,198,318,198,358,195,371,180,353,189,341"/>*/}
            {/*    <polygon id="QUADS" title=""*/}
            {/*             points="172,273,175,259,181,246,189,262,191,288,184,340,177,351,170,329,169,287,190"/>*/}
            {/*    <polygon id="QUADS" title="" points="163,371,153,330,166,293,167,333,174,356,171,373,171"/>*/}
            {/*    <polygon id="Right_Rectus_Abdominis" title=""*/}
            {/*             points="124,158,136,154,137,179,136,221,135,277,126,268,117,238,117,206,118,172"/>*/}
            {/*    <polygon id="Left_Brachioradialis" title=""*/}
            {/*             points="224,185,221,194,213,193,250,255,262,260,246,233,237,201,186"/>*/}
            {/*    <polygon id="Left_Biceps_Brachii_Short_Head" title="" points="187,150,187,165,203,192,207,186,202,179"/>*/}
            {/*    <polygon id="Left_Flexor_Digitorum" title="" points="207,191,207,204,214,220,226,234,243,262,249,258"/>*/}
            {/*    <polygon id="Left_Biceps_Brachii_Long_Head" title=""*/}
            {/*             points="192,135,189,148,204,176,217,190,220,183,210,150"/>*/}
            {/*    <polygon id="Right_Flexor_Digitorum" title="" points="34,262,50,236,63,220,70,203,69,190,29,256"/>*/}
            {/*    <polygon id="Right_Biceps_Brachii_Short_Head" title="" points="72,184,90,150,90,163,73,193"/>*/}
            {/*    <polygon id="Head_Back" title="" points="448,6,437,8,425,19,424,36,435,53,460,53,468,38,469,17,460,9"/>*/}
            {/*    <polygon id="Left_Trapezius" title=""*/}
            {/*             points="434,57,441,57,440,96,441,158,419,131,412,102,402,92,421,84,432,70"/>*/}
            {/*    <polygon id="Right_Trapezius" title=""*/}
            {/*             points="452,57,460,57,462,70,472,83,491,92,481,101,474,131,452,158,454,96"/>*/}
            {/*    <polygon id="Left_Deltoids_Back" title="" points="398,93,383,98,370,110,372,132,386,122,393,115"/>*/}
            {/*    <polygon id="Right_Deltoids_Back" title="" points="496,93,513,99,523,111,521,132,505,121,499,112"/>*/}
            {/*    <polygon id="Left_Latissimus_Dorsi" title=""*/}
            {/*             points="402,97,395,121,396,136,409,183,440,173,440,162,415,133,408,103"/>*/}
            {/*    <polygon id="Right_Latissimus_Dorsi" title=""*/}
            {/*             points="491,97,498,122,497,138,484,183,453,173,453,162,478,134,485,104"/>*/}
            {/*    <polygon id="Left_Triceps_Lateral" title="" points="392,123,371,137,363,176,368,198,380,156,392,137"/>*/}
            {/*    <polygon id="Right_Triceps_Lateral" title="" points="502,124,522,137,531,178,525,199,512,154,501,137"/>*/}
            {/*    <polygon id="Left_Triceps_Medial" title=""*/}
            {/*             points="9392,-118143,9392,-118167,9383,-118183,9374,-118188,9382,-118160"/>*/}
            {/*    <polygon id="Right_Triceps_Medial" title="" points="500,143,510,158,518,188,509,183,500,168"/>*/}
            {/*    <polygon id="Left_Erector_Spinae" title="" points="441,177,410,187,412,202,445,246,439,201"/>*/}
            {/*    <polygon id="Right_Erector_Spinae" title="" points="452,177,483,187,481,202,448,246,454,203"/>*/}
            {/*    <polygon id="Right_Extensor_Digitorum" title=""*/}
            {/*             points="532,184,543,202,548,227,564,256,555,251,536,216,527,203"/>*/}
            {/*    <polygon id="Right_Flexor_Carpi" title="" points="520,193,511,189,515,205,543,250,548,262,551,252"/>*/}
            {/*    <polygon id="Left_Extensor_Digitorum" title=""*/}
            {/*             points="361,184,350,203,345,226,329,256,338,251,358,214,366,201"/>*/}
            {/*    <polygon id="Right_Flexor_Carpi" title="" points="373,193,381,189,378,204,351,248,345,261,341,252"/>*/}
            {/*    <polygon id="GLUTES" title="" points="434,240,400,261,399,285,403,302,440,291,445,276"/>*/}
            {/*    <polygon id="GLUTES" title="" points="459,239,449,275,452,290,489,302,493,286,492,261"/>*/}
            {/*    <polygon id="GROINS" title="" points="442,295,434,295,426,301,435,345,443,325,444,310"/>*/}
            {/*    <polygon id="GROINS" title="" points="451,294,460,296,468,302,458,345,451,326,449,310"/>*/}
            {/*    <polygon id="HAMSTRINGS" title=""*/}
            {/*             points="397,293,402,310,415,302,412,324,410,359,398,378,397,351,394,338,393,315"/>*/}
            {/*    <polygon id="HAMSTRINGS" title=""*/}
            {/*             points="497,292,492,309,479,302,483,327,485,359,496,378,497,353,500,340,502,316"/>*/}
            {/*    <polygon id="HAMSTRINGS" title="" points="420,301,433,349,424,398,414,365,416,324"/>*/}
            {/*    <polygon id="HAMSTRINGS" title="" points="474,301,478,326,480,366,470,398,461,350"/>*/}
            {/*    <polygon id="Left_Knee_Back" title="" points="410,366,402,380,408,397,417,388"/>*/}
            {/*    <polygon id="Right_Knee_Back" title="" points="485,367,477,389,486,397,492,380"/>*/}
            {/*    <polygon id="CALVES" title=""*/}
            {/*             points="398,383,396,399,387,428,385,459,389,469,396,460,399,429,404,408,404,398"/>*/}
            {/*    <polygon id="CALVES" title="" points="417,394,412,400,407,410,402,430,400,457,409,476,420,454,421,403"/>*/}
            {/*    <polygon id="CALVES" title="" points="477,394,473,402,474,454,485,475,495,457,491,428,486,406"/>*/}
            {/*    <polygon id="CALVES" title="" points="495,383,499,402,507,427,509,459,504,468,499,461,495,428,489,401"/>*/}
            {/*    <polygon id="CALVES" title="" points="396,466,400,466,408,480,401,523,396,508,392,472"/>*/}
            {/*    <polygon id="CALVES" title="" points="493,466,498,466,502,472,498,507,494,522,487,481"/>*/}
            {/*    <polygon id="PERONEALS" title="" points="390,484,395,521,390,528,387,518"/>*/}
            {/*    <polygon id="PERONEALS" title="" points="504,482,499,521,503,528,508,517"/></svg>*/}

        </div>
        <div className="links">
            <h3>Current sizes</h3>
            {bodyParts.map((bodyPart, i) => {
                const size = data?.[bodyPart]?.size ? `${data[bodyPart].size} cm` : null ;
                return (
                    <div className='current-info' key={i}>
                        <CustomNavLink key={i} to={bodyPart}>{bodyPart}</CustomNavLink>
                        <h5>{size || '-'}</h5>
                    </div>
                )
            })}
        </div>
        <div className='bodyImage'>
            <img src="/body.jpg" alt="Body"/>
        </div>
    </>);
}

export default BodyInfo;