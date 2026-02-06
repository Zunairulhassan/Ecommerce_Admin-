import { Button } from '@mui/material';
import { IoMdAdd } from "react-icons/io";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { VscExport } from "react-icons/vsc";
import { MyContext } from '../../MyContext';

import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
const SubCategoryList = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const columns = [
    { id: 'image', label: 'CATEGORY IMAGE', minWidth: 200 },
    { id: 'catName', label: 'CATEGORY NAME', minWidth: 300 },
    { id: 'SubcatName', label: 'SAUB CATEGORY NAME', minWidth: 300 },
    { id: 'action', label: 'ACTION', minWidth: 200 },
  ];

  // Dummy rows with price for filter
  const getTypeByIndex = (index) => {
    const types = ["success", "warning", "error"];
    return types[index % types.length];
  };
  const rows = [
    {
      id: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s",
    },
    {
      id: 2,
      img: "https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.jpg?s=612x612&w=0&k=20&c=A3w_a9q3Gz-tWkQL6K00xu7UHdN5LLZefzPDp-wNkSU=",
    },
    {
      id: 3,
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITDxUSEBIWFRUXEhcVFRUWFRUVFRUWFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNyguLisBCgoKDg0OGhAQGi8iICUuLzAyLS0tLS0tMDIuNy0tLSstLTUtLS0tLS0tKzUtLS0tLS8tLS81LS0tNS0tLS0rLf/AABEIAOEA4AMBIgACEQEDEQH/xAAcAAEAAAcBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABNEAABAwIDBAcEBQcKAwkAAAABAAIDBBEFEiEGMUFRBxMiYXGBkRQjMqFCUnKCsQgzYpKywdEkQ1NVY5OiwuHwFlRzFSU0dIOzw9Pi/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAIDAQT/xAAiEQEBAAICAwABBQAAAAAAAAAAAQIREiEDMUFhIjJCUfD/2gAMAwEAAhEDEQA/AO4oiICIiAiIgIiICIiAiLE7UbQQ0NI+pqD2WjRo+J7z8LGDiSf3ncEFXHccp6OEzVUrY2DQX3uP1WNGrndwXJsW6Yqmd5jwulygmwklGd5voLRghrT3EuPcufYvitVi1YJZrm7skUTblrA4gCOMczpc7yV3jo+2GjoY2yShrqgjfvbED9Fnfzdx8N4apQbL7Q1Qz1OJPpgdcoNiPBkWS3gSqlX0dYu0XixYyu4daZo/mHOXWkQef8Rx7HcMd/KjKGXsJCRPC7l2zcNvy0K3HZPpbilLWVrRGToJmX6u/wCm03LPG5HOwXS6iBr2FkjQ5rgQ5rgHNcDvBB0IXB+k3o8NATW0IJpr+9i1Jgufibzj/Z8Nwd7Y4EAgggi4I1BB3EFRXG+iTbXK5lJM68TzaFxP5t53R/Zcd3Inv07IgIiICIiAiIgIiICIiAiIgIiICIiAiIgLzT0tbUur8RMMbv5PTudGwDc54NpZTz1BaO5unxFdw6R9ofYcMnnBtIW9XD/1ZOy0jw1d4NK80bK4a6oqI4GfFLI2MHiLntP77C7j9koOz9C+ybWxiulbqbtpwR8LdWvl8TqB3XP0l1ZUaOlZFEyKNoaxjGsY0bg1oAaB5AKsgIiICknia9rmPaHNcC1zSLggixBHEEKdEHmDajAjhuJyUov1Tve05JN+rdezb82kFt/0b8V3ro+x/wBsoWvebysPVy97mgWd94EHxJ5LUun7BesoI6xg7dNKLn+ykIa70dkPqsD0L4zkrOqJ7NRHp9tgL2/LrB5hB3BERAREQEREBERAREQEREBERAREQEREHBfyisbLqiCjaezGwzPHAvku1gPeGtcfvqn+T/hHWVslQ4aQRWbpp1k12gg8w1sg++Fo3SNiftGL1cvDr3Mb9mL3Tf2L+a7h0C4b1eEdaRrPO9/3WWiA8PduP3kHR0REBEWMrNoqOI2lqoGHk6WMH0JQZNFgW7aYaTYV1P8A3rBz5nuPoVlKLEoZheGaOT7D2v8A2SgpY/hjamkmp3bpYnx35ZmkA+RsfJeX9lq2SnlaSCJKebVp33jdq0+YIXq9ea+kvDfZcenAFmVAbO0DTV98/wDja8+aD0hBMHsa9pu1zQ5p5gi4PzVRav0aYh12Fw3OsYMR+4bN/wAORbQgIiICIiAiIgIiICIiAiIgIiICtMWrRBTyzO0bHE+Q+DGlx/BXa0bpixdkOEzRdY1sk7REwE6lrnASEN3kBmbzI5oPL0khJLnak6kneSdT816qwvGqLDcPp6eeoY10UEbHNBzOzBozXa29ruvvXmONwDrQszP+sQCR4cG/isrRYE+U3mlt3DU+pQdtrumegb+ba9/ebAHzbmWIq+m+ItIiiDDzcXvt5BoWhQbOUrTq0v8AtOJ+SysOE0Rb/wCHj/VCCfENvH1Bu+aJ+twyQyMZvJFg5oYOA8h33tW4jNlFonBp7I6l0Bv2Y29kEHNoG7gdzuF1Vm2ZoX/zeQ82OLf9Fg6zZaeC76SYuHFp0JHI8HeBCm4Y347yrKf9rOzlvtc0Ul75JmRMN7vdoHRA73v/ANgWlfVVbCHdcx9rFpfC22mT6TL/ANEz07ysJBj5I6iqYLD+blF4/pDs8Yj2natNu0TYb1fQUY19jlMTrXMEhzMIsCSx3FujzbkBvuouOM9xW7frZMK6S66msJGdYwWHZcZBoGj6V3N0b3auceQWN6UNrKbEI6WpiBbNE90cjdO0x/aBB7iw6fprDy1dn5KiMxScCPhNtCQR8WoI05EW0VriVLmYTYOuOy8b78Lkb/Aq5P6Tt13oPxK7Z4CfqytH+B//AMa6qvNPRZtCKWojlffKM0cgG/KRvA7jlPkvSNLUskY2SNwcxwu1zTcEHiCqcVUREBERAREQEREBERAREQERY/H8YipKWSpnNmRtuebjua1vNxJAHeUGF6QNtYsNp8zrPmfcQxXtmI3udyYNLnwA3rzLjOMVFbUOmqJC9zjq7cAODGD6LRy/1Kn2px+avq3zznVx+EHssYPgib3AepJO8lWsIsgvaRoYLNV9BUFY0OVRsiDNMq1cx1awTZVVjnQZ9tbbiriLElrJqFOyoQZfFqKOob2hrwPELVQ98DurkuWX7LuLfD+H71mmVllbYkWyMs5BkfbRUwdROA5+hhksMxOmjnDtPNs4AO8yEnUC2CdHLCcrjodA7eL2+F/fu7xuKs6GfK7q36jhz8u//fNbbSzNlblnbmaBaTKNXMOokaCbDTS/ZDL5juWWW8O56XP1dNXw6Z0cj22GYncSALg30Ph+5db6Kdr3QyClqTaN57BLicjjubqN3DfbdZc5xLZx/trYWSRnrAAyRz2CN7SHdWS4OIbdzSwEnXsnQOChQzSxF8MzXMlidbXsuHatw5HiOSq6y9Oevb1gi1no/wAd9qomFx94wBsg47tDa5tcczfRbMql3NuWaERF1wREQEREBERAREQFwDp92rMlS2hid2IbOksdHTOHZB+w0+rzyXb9ocVbS0k1S/URROfb6xA7LR3k2HmvH1ZVPmmfLIcz3Pc955veS5x9SglhbYKuwqkFUagrhZj/AIWrhCJ/ZZDEdc7QHC3eGkkeYWGY5b/sh0hTU7WxyOBjYLNOW723dckgPaHjfv18VGdynp2a+p9jcNirYmxyxR5GNIMrGtjma+Mg9W5zB22ujLbl2o1NzZYfGYKqWaOnZTuc9gIEcMfuWmQtcGss0bm5cznkm9ySLrq9HilNKPaQWQtfETmeOr7Ly60gB0dYMce7N3lYWo23jpaOKWKB745XPIcGhjTIO17xxcbB+ZzgQ2/xHXVeTHyZc21k4tIx3YWpo6X2iqkiYS4AQ5i6Q3IG8DLxHHzWshyvsf2hlq5M0zyWhxcyO/u478GjibaZjqsUXL2Y712xuvi46xU3yqkXKQuVOKFW2+o3hZXC605Q8b2a2IDrtJs4EEEGziDY/WdyWPcpKCbJJrq3eRzaRZ482kpex0bEqQVmHPa3O6SBvWsaXSvJjdoWgufbW2QHILuiYGiwJWoYVjIcWw1nbYRZstyJWDhd4BLhoN4J3cBZZLBq50D2u3mKXK46DsSWYXB3Vvy37PasXAOs0XKwO09D1VTK0Ny5ZMzRlc0BjzcWa4AgA3FiBa1lhjPeNaW/ydv2EqTRwB0j2zNJEcLmFoc6IjM0THNkJadGvaXbyLrpFJW53FjmOY4C9nW3dxGh4buY8vOezmKS+wxOpnOY+CRzJ8g1eyW3VyGzTmLbNbzF3Fd6w6u632af+ki1HJ1jmafBxt5JjcpbKrLVk0zqIi3YiIiAiIgIiICssaxAU9NLO74Y43PPg0XKvVwbpu25MkpoKZ/uozacg26yTcY7je1uoI4m/IILzpj2mL8OhayqilbUSEuZC3shsOVxu8uLrh5ZvA8FxWAaXUZycgvvOp8Sf4AKZgQVApwpQpggioqCvm4ZJ2LgDP1eS5tmEpeGHw7DvRctkG5bL7axxOiZVsifGYpM2eLP1REjhFGwAOLWZGgWsfiHDVYHaHaaWpaWl9x1klwQ0AsLmSRnIBYOB6wZhwsOJvYR4NM5rSwB2ZwaAHC93C405ab1b0eHySMLmAWDmtN3Aauvl3+CymHjl5L3l6WwU11WfRuDM5LbWB+IXsWxuGnhKz17lb3Wsu0IkqF1BF0RCoT6EHkVcBU6lt2oMtQjPZv14zEeeZgs07ifhMe4X36jeq+00WaGlnDQ0SQmM2AaLt3WAYxuhzDsggbszjcrE0MpMeh1aWuHrkd+0z0WXxJpMEkLQNA2pj0DDlLcz8t3BxAtKNc1g3QDNc5ZdZStMe8bFHYjExC+TOMzDGesb9aI6Si3EhuoHEsC7xse5zKaNriMgqCYTp7yKSzg4BoFhmDzaw052uvOOCzBtS2/wuNj4OGv7107Y3E5IqfqHDtxiTqHPLwJBG8N6tgsGuN3aEXLc58Fzy9dx3xd9O+osC/H5G5JHUz+odl96HNu3PaxfGe0Bc68lnQVrLKzssRREXXBERAREQYrajHY6KkkqZdzG6N4vedGMHeTYfNeQsaxB9RPJPIQXyPdI6wsMziSbDgNV0Hpp2z9sq/ZoXXp6dxGm6SXc5/eBq0feP0lzeAXe3xv5DU/IIKlSO2G8tP1dB+CnaFS3vKrhBM1TWUAo3QFdR4hICLySFoLSW9Y9tw05gLg6a3seF7q2RNDYarEKV/wPqowHFwaHZxc73XfITmOuved6s2TQAOyyzgh+dps34strntaG5dr/s4tQUTxyfVclV9XIQQXuIcQXAk2JaAG38AAPIclRRFaRERBG6mIuFIFOCgpYcdS3ndv6w0+YC2nD5BmpXG4EjJIH2uS4NIdZwDXXFjYAiw3m4C1CN1pCfA+hutg6zLSlwF+pqWPtkuMrrsOck6jcA3vPBZ+SdReFa/KwxusTcxyFpIvbsneL2NtPmusjGaaNkdZUvztAgbDAxuYufHE1z2OvoGBxBO/U8Dcrm+1EdqqQi1pGiUWIIJcAXatc4HtB1yDvvuWUprvw0OAJ6t3XEC+oYRFLc7t0kRH2SmU5SV3Hq2Ngxnb/EK05Kf+TxjQBoGew+jfc0W5LoPQ3tEXU76aoeM0b+wTbUPucumlwQR5LhM+KuLndX2Q617cwN6znRpWthxSB0rQ5pfbUA5SdcwvxBaCu3GTuOS76r1QigCoq0CIiAud9M22fsVH1ELrVE4LWkb449z5O4n4R3kn6K3rFK+OngknmdlZGwvce5ovpzPILyNtbtBJXVklTLve7stvcMjHwMHgPU3PFBh3FbPg2zDjhlTiUoIjYWwwDd1kr5GMe7va1pd4n7JVvsJsrJiNaynZcM+KaQfzcY3n7R0AHM8gV2DpyZHS4RTUkDQyPrmta0cGRRPPnqWm/NBwWLie9VwqUI7IVUIJgooFNZBBRCgooCgooggVBTEKVAQoiAhKKCC3d8Y9PULP4UzrBLFxkpzl55mtDhbje7dwuTutxGAm3g/pBbPsXCJK2KNzHPDmPaWtc1lxlfcPLiLstfM3eRpY3U5/tVj7WeKM62npqhoNmgQSaEi5uWkuyAa9re47rD4SrzZGJz4mxtjMhfLJG5t97MjZHWBIFyARfv47lm8U2djp6d7oSJ4JHPyAxkOikjc9kzA4m7fhyh2vA6i96GASihrAy9r1mUOJbdjZGw3Jv8VmyEaDvWXLeNka8eOUta43AqkzmCOFznA6OIytLSey4udYC4tpz0WyYfgUFDMyTEaprZQbNii7TmZwWl7mkXFgSe1kAI+luOQ2vxKvFE2eOWeFglNNMwtDHiSznCRrwM7Y3WIABsLALmvO/Hf333kqpMsp2i8cb09oQMAY0N3BoA1voBprxU60voix/wBrwmLMbyQ+4k53jAyOPiwsPjdbotWYiK3xCsZDDJNIbMjY57j3NBJ/BBx/8oPanKxmHxnV1pZ7cgfdsPiRm8mrhTQSbAEkmwA1JJ3Ad6yO02Lvq6uWok+KSQuPcNzWjuAAA7gFvPQTsp7VX+0ytvFTWcL7nTH82O/LYv8AEN5oOwdFexww6hDXge0S2fO7iDbsxX5MBI8S48Vo35R9RrRxjiJnfOJo/Erti4R+UM69bSN/sSfWX/8AKDk+VRAUxQBACmCgApgEABRRRsglsllNZRsgkSymsoWQS2SynUEEtkLVMlkFnUjRZfA8SFPOyUnQB4cL2LmuaQ5rTwdZxtu1tqFjKpvZPgqrPhJ3dl2vcWhcs3NOy6u3SdqMfdTOp4GQMjjdHmDCSO1IZXS+8FwQesjN99wN61LaeB72S1Eti8SxvdlJEYbIwM93xN8jBc/V71mNuagzS4UCzLmgiJzHUl7o29pzf0Q3drZZLpsb1TI2gj3rYr2AGkTXi1+OuUrDxySz8t/Jdy/hu2E7KvqsLkimbkkqaXO4nKD7QHB8UkjQPi+HjuuF58dG5pLXAhwJDgd4I0IPeDovXeBfBH/0W/stXAOmXAvZsVe9otHUDr28sxNpR45+1/6gV+G7xZ+T9y76Dcf9nxLqHm0dS3J3CVl3RnzGdvi4L0WvGlPK5j2yRmz2Oa9h5OYQ5p9QF672fxRtVSQ1LN0sTJLci5oJb5G48lqzZBc86cMY6jCzG02dM8M+63tu+YYPvLoa4V+UVW3mghH0Yi7w6xx/+kIOLFetujbZsUGGQw2944dbMecrwC4d+UWaO5oXmrYHCPasUpYCLtdO0vHNkfvHjzawjzXr1AXAPyhHf950/wD5Znzmk/gu/rgf5RUVq6lfzgt+pLf/ADoOYyDVQCml3qRBOFMFICpgUE4CjZQBUQgZUsoqKCWyhZT2SyCSyWU9ksgp2UbKayWQW9Q3snwKlH5k/Y/yn+CqzjsnwUsDLw2G8tAH6rkG/bYU4NVhDB/y8HoBCf3KHTbJniw5/B1O4nxyxn95V9jsrDiWFusSI4sj28zFBE9wHk4LW9sa8z4XSFwA6qV0AtqS0RMcCe/X5LDGfqxv++tsr1Y7RshtlBPWewxskD4Y3Bz3BoYTDkY4NsbnV3EDcVjunnBetw5tQ0dqnlBJtc9VLZj/APF1bvulWXQvM2qlqKo00MTgfjja/M50pLn3c9x35RoLDcumY1h7aimmp3/DLE+M+D2lt/mtMMeM0zyu68gXXeegDFy+ilpXHWCXMwf2c13D/GJPVcIMZaSx4s5pLXDk4Gzh6grofQbX9XiwjvpNA9lubmWkb8mv9VaXodeeun0E4kL/ANDFb1l/1XoVcV6f8LPXU9TbsvYYXHgHMJey/eQ548ig13oDow7Fy4j83SyuHcS6Nn4OcvRi8/dCErYsUdnIaHUkmpNho+J34B3our4t0jYXT3ElZGSPoxkyuvytGDbzQbUuL/lI0nu6SYcHSxn7wY9v/tuV7ivTxRsuKemmlPAvLYmnz7TvkudbedJs2JxNgkp4oo2yCQWL3yBwa5o7ZsLWcfooNSkfc3UuZUITw5aKsAgmBUwcpFC6CuHKoCrUPVVrkFcFLqRpUwQThFKo3QRUVLdRBQRslkul0FOYdk+Chh8d2NF7XLRfle4ulU6zHeCmoDZrPFp9AUGdqNpHPqIqiOJrDE2wa7thzjE2KR772vmDR2dwAHfey2ixMy0zA4j8/mDQA1rew6+Vo0aNRu5BY9gOQWVhWZr5Tw+V7f6LkxkdttejOgejyYQJLayzSO8mHqx82H1XRlwDY/bKSngjjppwY2NDcj+23zG9tzc2BG9b7Q9Jrbe/gP2o3Xv4NcBb1K64410jUAgxmrjAsDMZB4TNbLp5vcPJVuja4xejI/5gDycx4PyJUOkfGY63FpJoQ4Nyxx9q17sac17EjjbfwW4dDmyz5KptY9pEUJcWk/TkLSwAc7BxJ78vNB0HbPpFpMPBa+8so06tnA2uA5x0BtwFyLi4XENtelOqxCMwGKKOHMHZQC592m4vIdx+yBxVXpCa2SrnbIS0iolcHbwbusb+QC02SjcPhyu+yRf0NigquqhJEWO3/RPHwcOPiPkrH2V3K/gQfkFeUVDM54DYjvsc3ZHqf3K/xXD3QPySAsuLtsQWuH1mO3OH4cbFBhmUMh3Md6FVP+zJPqO9FXuOLr+aCEcEFvNRyDtBrtBr2TqP4hUjORvaR5K8MZHEqV32v9+SCzNSpTMqk7b/AEddw5k8LKi+Bzfja5vi0j8UFVj1cRlW8WX6wVy17PrD1QVmlTgqmJWfWCj1zPrD1QVAVFU+tb9Yeqde3mEFRFT65vNOuHNBVul1RNQ3mFSfWcGC5+SBXPvZg3k/JXOaw05WHi7QfJWtPEb5jq47ln8LwN0hBeDb/eqC/wAE2bqJAMsRH6T+wwd+upHgCtto+jmDqyJT1kjjdz9wvya3gFHBcIc0Dq2n1JW7YVhExtmQcgxvo4licXU7j3am48xqsMKLEGdkuc0HQut/nAuvSrMDuO0VMNmouICDkewexlE1wkqy+c/UtkYD+kL3f6gdy7dh80RYGxANaBYNAygDkBwVlFs9C3c0LIwUjW7gg827cO/lc1/6V/7ZBWnSWXoTbvoxbVyunppRFK7V7XD3bzzuNWk8dHeS5jifRZicd/ciQc2EOv4Btz6gINHbIRucR4G34K4ZXyjc8/I/ir2r2WrI/wA5TSttzaf3rHPopBvY79V38EFR2ISHe4fqs/gqRned7vkApDTv+qfQqpFQTO+CKR32WOd+AQUiTxKiLLK0myGIy/m6GpPjC9g/WeAFsWHdEWLSWzRRwjnLK38I8xQaT1efsNAFyBc6AX4k8lueH9E+KPZmgkgc39Gd4/yhbzs/0IMY4PraoyWIPVxtyM05uOp9Auq4dQRwsDIm2HzPiUHnSboqxkfzDH+E8R/bVk/o0xgb8Pv4SUp/By9RIg8qSdHmKjfhsnl1Z/Aq2l2LxFujsNqPKAn5gL1oiDyI7ZCu44dU/wBw/wDgpf8Ag+u/q+p/upF69RB5DGxtd/V9T/dPU42Jr/6vqP7t38V65RB5KbsPiXDDp/OOyydF0dYk49qllZ9y3zK9RIg4ZgXRlO0gviI5k2v+K6BhGxTGAZwFuaILKlwyNg0aFeAKKICIiAiIgIiICsq34h4H9yIgoU/xLKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP/Z",
    },
    {
      id: 4,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s",
    },


  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [priceFilter, setPriceFilter] = useState("");
  const context = useContext(MyContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter logic
  const filteredRows = rows.filter((row) => {
    if (!priceFilter) return true;
    return row.price >= Number(priceFilter);
  });

  return (
    <>
      <div className="flex flex-col p-5 card bg-white shadow-md pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-[700] text-[20px]">Sub Category List</h1>

          {/* Number filter input */}
          <div className="button ml-auto flex items-center justify-between gap-4">
            <Button className="!bg-green-500 !px-6 !py-2 !text-white">
              <VscExport className="text-white text-[25px] mr-1" /> EXPORT
            </Button>

            <Button className="btn-blue" onClick={() => context.setIsOpenFullScreen({
              open: true,
              model: 'Add New Sub Category'
            })}>
              <IoMdAdd className="text-white text-[20px]" /> Add New Sub Category
            </Button>
          </div>


        </div>
      </div>



      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Categories(" ")<span className='font-[400] text-[14px]'>(Material UI Table)</span>
          </h2>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell><Checkbox {...label} size='small' /></TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Checkbox size="small" />
                    </TableCell>

                    {/* Product Info */}
                    <TableCell>
                      <div className="flex items-center gap-4 w-[100px]">
                        <div className="img w-[170rem] h-[70px] rounded-md overflow-hidden group">
                          <Link to={row.link}>
                            <img src={row.img} alt="" className="w-full h-full group-hover:scale-105 transition-all" />
                          </Link>
                        </div>
                        <div className="info w-[80%]">
                          <h3 className="font-[600] leading-4 text-[12px] hover:text-primary">
                            <Link to={row.link}>{row.title}</Link>
                          </h3>
                          <span>{row.category}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip label="Fashion" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Chip label="Men" color='primary' />
                        <Chip label="WoMen" color='primary' />
                        <Chip label="Kids" color='primary' />

                      </div>
                    </TableCell>
                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                          <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                          <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default SubCategoryList;

