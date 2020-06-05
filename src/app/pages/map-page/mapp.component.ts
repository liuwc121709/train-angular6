import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

// @Injectable()
@Component({
  selector: 'app-mapp',
  templateUrl: './mapp.component.html',
  styleUrls: ['./mapp.component.css']
})
export class MappComponent implements OnInit {
    mapConfig = {
      ak: 'iGG2msceH2GHHVaeHBGNMDWZQRcWfrw4',
      dataConfig: [
        {
          type: 'sinkArea',
          mode: 'circle',
          zoomRange: [0, 13],
          nextZoom: 14,
          coordinate: false,
          bound: true
        },
        {
          type: 'sinkStreet',
          mode: 'circle',
          zoomRange: [14, 15],
          nextZoom: 16,
          coordinate: true
        },
        {
          type: 'sinkRoad',
          mode: 'rectangle',
          zoomRange: [16, 19],
          coordinate: true,
        }
      ]
    };
    mapData: any = [];
    area = {
      // tslint:disable-next-line
      '朝阳': '116.650961, 39.953068;116.647032, 39.98691;116.63902, 39.989921;116.646034, 39.996626;116.649706, 39.995966;116.64388, 40.008276;116.631617, 40.010369;116.634303, 40.013884;116.626779, 40.017684;116.608678, 40.019494;116.583337, 40.033667;116.58512, 40.038702;116.580325, 40.038528;116.583948, 40.035321;116.577237, 40.038048;116.572776, 40.043996;116.552859, 40.054862;116.558036, 40.059698;116.553933, 40.068316;116.549804, 40.065267;116.534848, 40.077006;116.519157, 40.076995;116.506039, 40.086195;116.493261, 40.086798;116.480795, 40.090768;116.477066, 40.095295;116.473772, 40.095749;116.47299, 40.087622;116.465244, 40.081215;116.465141, 40.075224;116.468604, 40.072735;116.466472, 40.065882;116.460544, 40.067309;116.456071, 40.064183;116.435535, 40.068009;116.430863, 40.072412;116.43275, 40.065729;116.416237, 40.061837;116.412391, 40.045844;116.402526, 40.042977;116.397532, 40.047478;116.396889, 40.043107;116.401384, 40.038986;116.357698, 40.032456;116.383528, 39.998723;116.388012, 39.979005;116.40079, 39.97939;116.394425, 39.967819;116.414458, 39.968379;116.415992, 39.980297;116.420749, 39.968351;116.43714, 39.965434;116.436895, 39.956094;116.44256, 39.955003;116.442105, 39.957971;116.445465, 39.95794;116.44827, 39.954014;116.445335, 39.952313;116.454021, 39.950843;116.450578, 39.934475;116.441115, 39.934524;116.44309, 39.907813;116.455279, 39.908899;116.452628, 39.906324;116.454046, 39.899926;116.459053, 39.897876;116.450892, 39.895587;116.449793, 39.872004;116.45289, 39.866792;116.454981, 39.869156;116.460988, 39.865187;116.462645, 39.867017;116.474563, 39.861438;116.474382, 39.858866;116.467016, 39.854221;116.458569, 39.857585;116.457234, 39.854407;116.452674, 39.854041;116.45328, 39.849707;116.449059, 39.849332;116.448289, 39.84585;116.443078, 39.847219;116.437897, 39.838821;116.431945, 39.838433;116.443149, 39.836254;116.443145, 39.833759;116.447598, 39.835391;116.451186, 39.826488;116.460672, 39.828388;116.470039, 39.820021;116.475428, 39.820441;116.481001, 39.815478;116.491881, 39.818779;116.492268, 39.822973;116.496732, 39.822401;116.500149, 39.825843;116.50506, 39.821924;116.51287, 39.823894;116.509685, 39.82523;116.516838, 39.827781;116.521553, 39.836695;116.532658, 39.836257;116.533103, 39.833261;116.541563, 39.831367;116.544886, 39.834336;116.539895, 39.839188;116.549452, 39.836211;116.552099, 39.842243;116.567975, 39.840461;116.569324, 39.838091;116.579062, 39.840809;116.584542, 39.833384;116.593998, 39.833964;116.590735, 39.830712;116.605338, 39.830648;116.605927, 39.837426;116.609081, 39.837626;116.60846, 39.846971;116.614921, 39.852365;116.611549, 39.852399;116.61093, 39.855871;116.620173, 39.856692;116.63354, 39.867144;116.626555, 39.874742;116.631159, 39.887536;116.635563, 39.887997;116.634512, 39.896742;116.622236, 39.895824;116.620665, 39.902338;116.627021, 39.904405;116.624334, 39.905667;116.630369, 39.910416;116.627265, 39.911221;116.629537, 39.920046;116.626791, 39.928306;116.637056, 39.927871;116.630683, 39.9362;116.631415, 39.938363;116.635707, 39.937628;116.636168, 39.945441;116.640367, 39.944769;116.636452, 39.952173;116.638575, 39.95661;116.650961, 39.953068',
      // tslint:disable-next-line
      '海淀': '116.401487, 40.039207;116.396889, 40.043107;116.397532, 40.047478;116.377657, 40.050901;116.37268, 40.057578;116.378756, 40.060252;116.378416, 40.063869;116.38833, 40.067337;116.386925, 40.072623;116.378832, 40.071619;116.37642, 40.075512;116.369154, 40.074739;116.368994, 40.071752;116.35321, 40.069508;116.347215, 40.060883;116.344822, 40.064725;116.331751, 40.060512;116.32435, 40.067597;116.309113, 40.066593;116.296607, 40.089372;116.286507, 40.086216;116.279269, 40.10179;116.268982, 40.103106;116.265632, 40.107748;116.270285, 40.109673;116.269104, 40.11678;116.265338, 40.119276;116.262631, 40.110699;116.247047, 40.113918;116.253693, 40.141818;116.23991, 40.142391;116.22239, 40.148754;116.21529, 40.146573;116.208517, 40.166773;116.198876, 40.164907;116.198355, 40.16135;116.18891, 40.164052;116.183772, 40.150544;116.169704, 40.145505;116.176713, 40.138393;116.177473, 40.134075;116.172708, 40.134136;116.176374, 40.130104;116.138833, 40.127404;116.135601, 40.120445;116.119007, 40.120749;116.112127, 40.123367;116.107802, 40.121401;116.102224, 40.126752;116.090536, 40.125619;116.079881, 40.121081;116.075122, 40.110754;116.060977, 40.10234;116.054, 40.091797;116.070767, 40.07877;116.07186, 40.072948;116.078244, 40.06743;116.075073, 40.057504;116.084592, 40.03861;116.09104, 40.036373;116.106226, 40.039283;116.122264, 40.038312;116.128147, 40.035514;116.141491, 40.03639;116.155199, 40.028265;116.164202, 40.027154;116.179801, 40.015023;116.18223, 40.01236;116.179408, 40.006919;116.16247, 40.00416;116.157989, 39.999703;116.165089, 39.990218;116.173858, 39.993708;116.177325, 39.983005;116.184602, 39.988307;116.185766, 39.994289;116.192053, 39.991767;116.19262, 39.976217;116.209435, 39.965824;116.220326, 39.952081;116.226888, 39.949271;116.226802, 39.946715;116.22284, 39.94674;116.222906, 39.939679;116.220202, 39.939789;116.222962, 39.9342;116.213814, 39.929723;116.213633, 39.922735;116.24337, 39.923018;116.259036, 39.92726;116.259921, 39.924087;116.256267, 39.922312;116.259923, 39.921779;116.26, 39.903259;116.301553, 39.902767;116.301405, 39.893294;116.320421, 39.902819;116.344906, 39.90286;116.341855, 39.904866;116.339888, 39.943935;116.335118, 39.948279;116.358218, 39.949025;116.359964, 39.956932;116.362746, 39.956739;116.36368, 39.950249;116.378517, 39.955318;116.376908, 39.97395;116.387092, 39.974395;116.388298, 39.983529;116.383845, 39.998101;116.357698, 40.032456;116.401487, 40.039207',
      // tslint:disable-next-line
      '昌平': '116.473772, 40.095749;116.47299, 40.087622;116.465244, 40.081215;116.465141, 40.075224;116.468604, 40.072735;116.466615, 40.065984;116.460544, 40.067309;116.456071, 40.064183;116.435535, 40.068009;116.42999, 40.072106;116.43275, 40.065729;116.416237, 40.061837;116.412786, 40.05589;116.415336, 40.04938;116.407072, 40.043995;116.402465, 40.042985;116.399708, 40.047975;116.385449, 40.048779;116.375109, 40.052966;116.372222, 40.059173;116.378648, 40.06014;116.378416, 40.063869;116.388474, 40.067754;116.387389, 40.072326;116.378832, 40.071619;116.37642, 40.075512;116.369154, 40.074739;116.368994, 40.071752;116.35321, 40.069508;116.348979, 40.061108;116.344822, 40.064725;116.331751, 40.060512;116.32435, 40.067597;116.309113, 40.066593;116.296607, 40.089372;116.286507, 40.086216;116.279269, 40.10179;116.270942, 40.101228;116.26565, 40.10767;116.270872, 40.1119;116.265338, 40.119276;116.262631, 40.110699;116.247047, 40.113918;116.253693, 40.141818;116.23991, 40.142391;116.22239, 40.148754;116.21529, 40.146573;116.206418, 40.166775;116.198876, 40.164907;116.198355, 40.16135;116.18891, 40.164052;116.183772, 40.150544;116.169704, 40.145505;116.176713, 40.138393;116.177473, 40.134075;116.172708, 40.134136;116.176374, 40.130104;116.138833, 40.127404;116.135601, 40.120445;116.119007, 40.120749;116.112127, 40.123367;116.107802, 40.121401;116.102224, 40.126752;116.090536, 40.125619;116.079881, 40.121081;116.075122, 40.110754;116.060977, 40.10234;116.054, 40.091797;116.043404, 40.091064;116.039397, 40.086242;116.036358, 40.088601;116.026281, 40.081036;116.01379, 40.086812;115.993518, 40.089766;115.974755, 40.081728;115.973377, 40.090454;115.966672, 40.097771;115.969245, 40.108755;115.96301, 40.107051;115.962371, 40.102609;115.958701, 40.10751;115.949637, 40.109604;115.954194, 40.113696;115.952959, 40.116683;115.933307, 40.137614;115.919565, 40.145361;115.910425, 40.142689;115.906513, 40.145432;115.888248, 40.145605;115.871581, 40.155017;115.863038, 40.153843;115.856291, 40.165398;115.858916, 40.169076;115.853482, 40.16973;115.850934, 40.173988;115.861343, 40.186219;115.855263, 40.190075;115.861679, 40.195039;115.872155, 40.191851;115.879854, 40.193721;115.884757, 40.207031;115.892982, 40.212085;115.890973, 40.224366;115.90616, 40.242828;115.920012, 40.241398;115.923915, 40.252736;115.937963, 40.261176;115.956618, 40.259986;115.957479, 40.26239;115.970762, 40.263449;115.976524, 40.269925;115.97487, 40.271833;115.986814, 40.278109;115.989907, 40.282498;115.987396, 40.290397;115.989988, 40.290743;115.986401, 40.299035;115.991282, 40.304068;115.998291, 40.305413;115.992529, 40.312052;115.983978, 40.314486;115.981802, 40.325034;115.998159, 40.333618;116.00254, 40.334753;116.007302, 40.331401;116.015692, 40.339125;116.025015, 40.340673;116.033895, 40.331318;116.038758, 40.31857;116.046414, 40.318327;116.050134, 40.323067;116.061617, 40.32323;116.064768, 40.328387;116.061367, 40.33323;116.069581, 40.342626;116.084956, 40.345398;116.094592, 40.3361;116.11795, 40.336246;116.129815, 40.318394;116.140436, 40.31767;116.149649, 40.323403;116.145928, 40.336851;116.151203, 40.342077;116.143967, 40.344714;116.14859, 40.348919;116.146265, 40.351386;116.148616, 40.354138;116.153762, 40.353483;116.1545, 40.34174;116.162854, 40.347627;116.163417, 40.351072;116.153344, 40.357226;116.156329, 40.368086;116.18456, 40.377073;116.188275, 40.373516;116.199383, 40.379154;116.215683, 40.380884;116.222142, 40.387891;116.234614, 40.38668;116.239704, 40.380487;116.251629, 40.385392;116.256633, 40.37967;116.263661, 40.388661;116.269041, 40.386457;116.278553, 40.388645;116.290498, 40.381602;116.297627, 40.386609;116.298423, 40.398935;116.302809, 40.397019;116.30301, 40.390467;116.32033, 40.395032;116.330712, 40.392802;116.352608, 40.378424;116.362343, 40.376726;116.366612, 40.371632;116.358915, 40.370917;116.356017, 40.361869;116.367204, 40.365132;116.376575, 40.36248;116.371407, 40.354807;116.376696, 40.348162;116.372208, 40.336545;116.383278, 40.339632;116.382782, 40.343743;116.391114, 40.345097;116.403511, 40.340843;116.41471, 40.341156;116.424033, 40.335708;116.440978, 40.334714;116.44522, 40.338711;116.450338, 40.328462;116.462589, 40.320204;116.450424, 40.308148;116.455418, 40.305618;116.456151, 40.29123;116.467389, 40.292419;116.478354, 40.285693;116.4857, 40.285507;116.493731, 40.27088;116.512135, 40.267943;116.507988, 40.265449;116.51022, 40.258547;116.506753, 40.255742;116.502916, 40.258756;116.488939, 40.252507;116.491884, 40.246232;116.489303, 40.245134;116.491378, 40.229415;116.484186, 40.230037;116.477542, 40.220409;116.478921, 40.210538;116.494423, 40.197437;116.494477, 40.184068;116.486345, 40.175386;116.486625, 40.16873;116.483048, 40.164878;116.494492, 40.163766;116.493379, 40.15592;116.489632, 40.156776;116.485479, 40.152911;116.490782, 40.146327;116.498767, 40.114153;116.492983, 40.105523;116.472503, 40.100576;116.473772, 40.095749',
      // tslint:disable-next-line
      '门头沟': '115.860412, 40.155524;115.871914, 40.154902;115.888248, 40.145605;115.906513, 40.145432;115.910425, 40.142689;115.919565, 40.145361;115.928524, 40.140953;115.952959, 40.116683;115.954194, 40.113696;115.949637, 40.109604;115.958701, 40.10751;115.962371, 40.102609;115.96301, 40.107051;115.969245, 40.108755;115.966672, 40.097771;115.973377, 40.090454;115.974593, 40.081758;115.993518, 40.089766;116.01379, 40.086812;116.026129, 40.080999;116.036358, 40.088601;116.039397, 40.086242;116.043404, 40.091064;116.054, 40.091797;116.070767, 40.07877;116.07186, 40.072948;116.078244, 40.06743;116.075073, 40.057504;116.084592, 40.03861;116.09104, 40.036373;116.10518, 40.039281;116.122264, 40.038312;116.128147, 40.035514;116.141025, 40.036491;116.170625, 40.023018;116.18223, 40.01236;116.179408, 40.006919;116.16247, 40.00416;116.150198, 39.995547;116.135465, 39.994379;116.120886, 39.988255;116.127885, 39.971781;116.121887, 39.963685;116.130208, 39.955807;116.116104, 39.951932;116.127137, 39.939331;116.131242, 39.940775;116.137759, 39.930542;116.148229, 39.927652;116.162688, 39.903739;116.174627, 39.894426;116.184214, 39.891046;116.179141, 39.889248;116.161031, 39.89432;116.122163, 39.882549;116.118603, 39.878862;116.110236, 39.879363;116.110106, 39.87353;116.103456, 39.874744;116.094512, 39.872016;116.086881, 39.876225;116.079714, 39.875326;116.075214, 39.871628;116.078168, 39.859578;116.072705, 39.86001;116.070578, 39.856734;116.06589, 39.858833;116.061155, 39.852115;116.052303, 39.853584;116.038669, 39.850601;116.038362, 39.852371;116.035915, 39.849143;116.025053, 39.846404;116.02322, 39.855092;116.014266, 39.856563;115.997288, 39.84584;115.990326, 39.854785;115.991787, 39.864836;115.99521, 39.866946;115.991624, 39.872345;115.999186, 39.873413;116.002504, 39.881277;115.992552, 39.880846;115.982247, 39.873912;115.975047, 39.87365;115.977365, 39.877668;115.974583, 39.877699;115.964137, 39.872697;115.958913, 39.873218;115.953518, 39.878418;115.932178, 39.881745;115.928876, 39.891742;115.942342, 39.904772;115.952578, 39.907348;115.950191, 39.913088;115.952641, 39.915738;115.947772, 39.92352;115.940182, 39.917917;115.935605, 39.920847;115.886342, 39.921939;115.88022, 39.919324;115.874142, 39.910826;115.852456, 39.902875;115.841495, 39.90584;115.826812, 39.920917;115.817518, 39.919817;115.807311, 39.927967;115.788562, 39.92611;115.775761, 39.9305;115.756958, 39.924824;115.753461, 39.918891;115.737323, 39.912862;115.700159, 39.906877;115.684552, 39.892895;115.661395, 39.888631;115.655867, 39.881885;115.650824, 39.881807;115.64647, 39.87742;115.637215, 39.877221;115.629481, 39.872301;115.622703, 39.862517;115.619555, 39.849039;115.611933, 39.84455;115.603085, 39.826936;115.594154, 39.820079;115.575883, 39.819522;115.554357, 39.829123;115.552178, 39.832714;115.537181, 39.836299;115.53031, 39.844828;115.521231, 39.844182;115.518225, 39.850986;115.528901, 39.864494;115.528671, 39.87412;115.533748, 39.87587;115.535893, 39.880831;115.515946, 39.889208;115.528612, 39.90649;115.513884, 39.919311;115.494083, 39.929783;115.488382, 39.942039;115.470142, 39.946439;115.450219, 39.958209;115.433157, 39.956707;115.431004, 39.962084;115.433591, 39.971275;115.430727, 39.977413;115.436052, 39.99116;115.447976, 40.000204;115.457293, 39.999964;115.455756, 40.008861;115.449485, 40.017077;115.458813, 40.027432;115.462258, 40.036607;115.476253, 40.038407;115.491217, 40.045794;115.497045, 40.053611;115.51234, 40.061854;115.516807, 40.071757;115.53117, 40.081406;115.542282, 40.083771;115.549471, 40.082083;115.55714, 40.08543;115.560416, 40.089125;115.558798, 40.09708;115.568681, 40.10417;115.575871, 40.103554;115.580647, 40.107051;115.583999, 40.102318;115.595773, 40.101989;115.597517, 40.115542;115.600004, 40.11469;115.599794, 40.12128;115.60453, 40.125546;115.646328, 40.121465;115.650464, 40.132731;115.660047, 40.137224;115.663166, 40.133933;115.686818, 40.138829;115.692476, 40.136734;115.698236, 40.138289;115.702399, 40.132879;115.715563, 40.132497;115.717425, 40.134524;115.705706, 40.138458;115.717393, 40.140532;115.730732, 40.134284;115.747268, 40.137718;115.760696, 40.150328;115.75598, 40.158764;115.761052, 40.170388;115.775133, 40.170962;115.780784, 40.181263;115.791748, 40.185127;115.793272, 40.176499;115.812814, 40.159789;115.828046, 40.158961;115.841851, 40.15149;115.840614, 40.156226;115.853558, 40.153117;115.860412, 40.155524',
      // tslint:disable-next-line
      '石景山': '116.157989, 39.999703;116.165089, 39.990218;116.173858, 39.993708;116.177325, 39.983005;116.184602, 39.988307;116.185766, 39.994289;116.192053, 39.991767;116.19262, 39.976217;116.209435, 39.965824;116.220326, 39.952081;116.226888, 39.949271;116.226802, 39.946715;116.22284, 39.94674;116.222906, 39.939679;116.220202, 39.939789;116.222962, 39.9342;116.213814, 39.929723;116.213633, 39.922735;116.24337, 39.923018;116.259538, 39.926855;116.256267, 39.922312;116.259923, 39.921779;116.26, 39.903259;116.264987, 39.902837;116.246477, 39.901145;116.244196, 39.8977;116.240055, 39.897981;116.241011, 39.895285;116.23554, 39.896353;116.234601, 39.889145;116.225699, 39.887068;116.2252, 39.882502;116.218569, 39.884146;116.219185, 39.880471;116.214937, 39.880464;116.204496, 39.88917;116.192828, 39.888561;116.174627, 39.894426;116.162323, 39.90415;116.148229, 39.927652;116.137759, 39.930542;116.131242, 39.940775;116.127137, 39.939331;116.116172, 39.951699;116.130208, 39.955807;116.121887, 39.963685;116.127885, 39.971781;116.120886, 39.988255;116.125742, 39.991769;116.150045, 39.995504;116.157989, 39.999703'
    };
    sinkAreaData = [{
      'title': '海淀',
      'longitude': '116.305434',
      'latitude': '39.96549',
      'count': '445'
    },
    {
      'title': '朝阳',
      'longitude': '116.449559',
      'latitude': '39.926375',
      'count': '377'
    },
    {
      'title': '昌平',
      'longitude': '116.237618',
      'latitude': '40.226413',
      'count': '370'
    },
    {
      'title': '门头沟',
      'longitude': '116.107604',
      'latitude': '39.946147',
      'count': '300'
    },
    {
      'title': '石景山',
      'longitude': '116.229613',
      'latitude': '39.911354',
      'count': '290'
    }
  ];
  sinkStreetData = [
    {
      'name': '北京市海淀区圆明园',
      'title': '圆明园',
      'count': '50',
    },
    {
      'name': '北京市海淀区五道口',
      'title': '五道口',
      'count': '30',
    },
    {
      'name': '北京市海淀区中关村',
      'title': '中关村',
      'count': '66',
    },
    {
      'name': '北京市石景山区苹果园',
      'title': '苹果园',
      'count': '12',
    },
    {
      'name': '北京市石景山区杨庄',
      'title': '杨庄',
      'count': '32',
    },
    {
      'name': '北京市石景山区八角',
      'title': '八角',
      'count': '89',
    },
    {
      'name': '北京市门头沟区大峪',
      'title': '大峪',
      'count': '54',
    },
    {
      'name': '北京市门头沟区冯村',
      'title': '冯村冯村',
      'count': '9',
    },
    {
      'name': '北京市朝阳区常营',
      'title': '常营',
      'count': '77',
    },
    {
      'name': '北京市朝阳区十里堡',
      'title': '十里堡',
      'count': '26',
    }
  ];
  sinkRoadData = [
    {
      'name': '北京市海淀区中关村科育小区',
      'title': '科育小区',
      'count': '6',
    },
    {
      'name': '北京市海淀区中关村黄庄小区',
      'title': '黄庄小区',
      'count': '8',
    },
    {
      'name': '北京市海淀区中关村东南小区',
      'title': '东南小区',
      'count': '3',
    },
    {
      'name': '北京市海淀区中关村大泥湾',
      'title': '大泥湾',
      'count': '13',
    },
    {
      'name': '北京市海淀区五道口东王庄',
      'title': '东王庄',
      'count': '6',
    },
    {
      'name': '北京市海淀区五道口西王庄小区',
      'title': '西王庄小区',
      'count': '8',
    },
    {
      'name': '北京市海淀区五道口王庄路27号院',
      'title': '东南小区',
      'count': '3',
    },
    {
      'name': '北京市海淀区圆明园西苑医院',
      'title': '西苑医院',
      'count': '2',
    },
    {
      'name': '北京市海淀区圆明园挂甲屯',
      'title': '挂甲屯',
      'count': '22',
    },
    {
      'name': '北京市海淀区圆明园挂甲屯5号院',
      'title': '挂甲屯5号院',
      'count': '14',
    },
  ];

    constructor(private router: Router, private http: HttpClient) {
}
  ngOnInit() { }

  getDataByType(type) {
    if (type === 'sinkArea') {
        this.mapData = {
          area: this.area,
          mapData: this.sinkAreaData
        };
    } else if (type === 'sinkStreet') {
        this.mapData = {
          mapData: this.sinkStreetData
        };
    } else if (type === 'sinkRoad') {
      this.mapData = {
        mapData: this.sinkRoadData
      };
    }
  }
}
