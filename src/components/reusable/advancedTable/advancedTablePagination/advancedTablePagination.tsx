// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"

export interface ParentProps {
  count: number
  currentPageIndex: number
  pageSize: number
  goToPage: (pageIndex: number) => void
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class AdvancedTablePagination extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    // Calculate helping variables
    // const firstRecordShownIndex = this.props.pageIndex * this.props.pageSize
    // const lastRecordShownIndex = firstRecordShownIndex + this.props.pageSize - 1
    const pagesAvailable = Math.ceil(this.props.count / this.props.pageSize)
    const firstPageAvailableIndex = 0
    const lastPageAvailableIndex = pagesAvailable - 1
    const previousPageIndex = this.props.currentPageIndex - 1
    const nextPageIndex = this.props.currentPageIndex + 1
    const onFirstPage = this.props.currentPageIndex === firstPageAvailableIndex
    const onLastPage = this.props.currentPageIndex === lastPageAvailableIndex
    const currentPageNumberReadable = this.props.currentPageIndex + 1
    const firstPageAvailableNumberReadable = firstPageAvailableIndex + 1
    const lastPageAvailableNumberReadable = lastPageAvailableIndex + 1
    const previousPageNumberReadable = previousPageIndex + 1
    const nextPageNumberReadable = nextPageIndex + 1
    if (pagesAvailable > 0) {
      return (
        <nav className="pagination">
          <button
            className="pagination-previous"
            disabled={onFirstPage}
            onClick={e => this.props.goToPage(previousPageIndex)}
          >
            {this.props.cl(l => l.advancedTable.pagination.previous())}
          </button>
          <button
            className="pagination-next"
            disabled={onLastPage}
            onClick={e => this.props.goToPage(nextPageIndex)}
          >
            {this.props.cl(l => l.advancedTable.pagination.next())}
          </button>
          <ul className="pagination-list">
            {!onFirstPage ? (
              <li>
                <button
                  className="pagination-link"
                  onClick={e => this.props.goToPage(firstPageAvailableIndex)}
                >
                  {firstPageAvailableNumberReadable}
                </button>
              </li>
            ) : null}
            {this.props.currentPageIndex - firstPageAvailableIndex > 2 ? (
              <li>
                <span className="pagination-ellipsis">…</span>
              </li>
            ) : null}
            {this.props.currentPageIndex - firstPageAvailableIndex > 1 ? (
              <li>
                <button
                  className="pagination-link"
                  onClick={e => this.props.goToPage(previousPageIndex)}
                >
                  {previousPageNumberReadable}
                </button>
              </li>
            ) : null}
            <li>
              <button className="pagination-link is-current">
                {currentPageNumberReadable}
              </button>
            </li>
            {lastPageAvailableIndex - this.props.currentPageIndex > 1 ? (
              <li>
                <button
                  className="pagination-link"
                  onClick={e => this.props.goToPage(nextPageIndex)}
                >
                  {nextPageNumberReadable}
                </button>
              </li>
            ) : null}
            {lastPageAvailableIndex - this.props.currentPageIndex > 2 ? (
              <li>
                <span className="pagination-ellipsis">…</span>
              </li>
            ) : null}
            {!onLastPage ? (
              <li>
                <button
                  className="pagination-link"
                  onClick={e => this.props.goToPage(lastPageAvailableIndex)}
                >
                  {lastPageAvailableNumberReadable}
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      )
    } else return null
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTablePagination, { stateMappings, dispatchMappings }))()
