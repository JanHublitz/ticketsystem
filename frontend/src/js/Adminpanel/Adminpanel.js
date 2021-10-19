import "../../css/Adminpanel/Adminpanel.scss"
import { Paper } from "@material-ui/core"
import { useEffect } from "react"

export default function Adminpanel() {

	useEffect(() => {
		var doc = document.documentElement.style;

		doc.setProperty('--sidebar-backgroundColor', 'var(--darkbluelight)');
		doc.setProperty('--sidebar-color', 'white');
		doc.setProperty('--sidebar-activeColor', 'var(--darkblue)');
		doc.setProperty('--sidebar-hoverColor', 'white');
		doc.setProperty('--sidebar-hoverbackgroundColor', 'white');
	})

	return (
		<div className="Adminpanel">
			<Paper className="Topbar">

			</Paper>

			<div className="rows-wrapper">
				<div className="row">
					<Paper className="block h b2">

					</Paper>

					<Paper className="block h b4">

					</Paper>
				</div>

				<div className="row">
					<div className="col b2">
						<div className="wrapper">
							<Paper className="block h b1">

							</Paper>

							<Paper className="block h b1">

							</Paper>
						</div>

						<Paper className="block h b2">

						</Paper>
					</div>

					<Paper className="block h b8">

					</Paper>
				</div>

				<div className="row">
					<Paper className="block h b4">

					</Paper>

					<Paper className="block h b1">

					</Paper>
				</div>
			</div>
		</div >
	)
}